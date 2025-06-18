import asyncio
import json
import websockets
import os
import wave
from datetime import datetime
from faster_whisper import WhisperModel
import numpy as np
import tempfile
import re
from autofixer import model_autofix
from aiohttp import web
import aiohttp_cors
from aiohttp_cors import ResourceOptions
import grpc
import summarizer_pb2 as pb2
import summarizer_pb2_grpc as pb2_grpc

CORS_HEADERS = {
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Headers": "*"
}
 
SAVE_DIR = "recordings"
os.makedirs(SAVE_DIR, exist_ok=True)
model = WhisperModel("base", compute_type="int8")

BUFFER_SECONDS = 5
SAMPLE_RATE = 16000
SAMPLES_PER_CHUNK = SAMPLE_RATE * BUFFER_SECONDS

clients = {}

def clean_transcription(text: str) -> str:
    text = text.strip()
    text = re.sub(r'\s+', ' ', text)
    text = re.sub(r'(\b\w+\b)( \1\b)+', r'\1', text, flags=re.IGNORECASE)

    try:
        text = model_autofix(text)
    except Exception as e:
        print(f"⚠️ AutoFix model failed: {e}")

    text = text.strip().capitalize()
    if not text.endswith('.'):
        text += '.'
    return text

def preprocess_audio(samples: np.ndarray) -> np.ndarray:
    samples = samples - np.mean(samples)
    max_val = np.max(np.abs(samples))
    if max_val > 0:
        samples = samples * (32767.0 / max_val)
    return samples.astype(np.int16)

async def transcribe_and_send(samples: np.ndarray, websocket):
    samples = preprocess_audio(samples)
    with tempfile.NamedTemporaryFile(suffix=".wav", delete=False) as f:
        filename = f.name

    final_text = ""
    try:
        with wave.open(filename, "wb") as wf:
            wf.setnchannels(1)
            wf.setsampwidth(2)
            wf.setframerate(16000)
            wf.writeframes(samples.tobytes())

        segments, _ = model.transcribe(filename, beam_size=5, language="ru")
        for segment in segments:
            text = clean_transcription(segment.text)
            if text:
                final_text += text + " "
                toSend = {'text': text, 'is_updated': False}
                print(toSend)
                await websocket.send(json.dumps(toSend))
    finally:
        try:
            os.remove(filename)
        except Exception as e:
            print(f"⚠️ Failed to remove file {filename}: {e}")

    return final_text.strip()


def transcribe_file(filepath: str) -> str:
    try:
        segments, _ = model.transcribe(filepath, beam_size=5, language="ru")
        full_text = ""
        for segment in segments:
            if segment.text:
                cleaned = clean_transcription(segment.text.strip())
                full_text += cleaned + " "
        return full_text.strip()
    except Exception as e:
        print(f"⚠️ Ошибка при расшифровке файла {filepath}: {e}")
        return ""

def send_to_summarizer(text: str, topic: str = "default", token: str = ""):
    try:
        request = pb2.CreateMessageRequest(
            token=token,
            text=text,
            topic=topic
        )
        response = summarizer_stub.CreateMessage(request)
        if response.error:
            print(f"⚠️ Ошибка от summarizer сервиса: {response.error}")
        else:
            print(f"✅ Текст успешно отправлен в summarizer.")
    except grpc.RpcError as e:
        print(f"❌ gRPC ошибка при отправке текста: {e}")

# WebSocket handler
async def ws_handler(websocket):
    print("🔌 Client connected")
    buffer = np.array([], dtype=np.int16)
    full_transcript = ""
    token = ""
    topic = "default"

    try:
        # Получаем первый пакет — конфигурацию
        config_message = await websocket.recv()
        try:
            config = json.loads(config_message)
            token = config.get("token", "")
            topic = config.get("topic", "default")
        except Exception as e:
            print(f"⚠️ Ошибка парсинга конфигурации: {e}")

        # Обрабатываем аудио потоки
        async for message in websocket:
            chunk = np.frombuffer(message, dtype=np.int16)
            buffer = np.concatenate([buffer, chunk])
            if len(buffer) >= SAMPLES_PER_CHUNK:
                text = await transcribe_and_send(buffer[:SAMPLES_PER_CHUNK], websocket)
                if text:
                    full_transcript += text + " "
                buffer = buffer[SAMPLES_PER_CHUNK:]
    except websockets.ConnectionClosed:
        print("❌ Client disconnected")
        if full_transcript.strip():
            send_to_summarizer(full_transcript.strip(), topic=topic, token=token)
    finally:
        if full_transcript.strip():
            send_to_summarizer(full_transcript.strip(), topic=topic, token=token)
        print("📤 Сообщение отправлено в summarizer после закрытия WebSocket.")

# HTTP handler
async def http_transcribe(request):
    reader = await request.multipart()

    token = ""
    topic = "default"
    audio_field = None

    # Читаем все поля multipart запроса
    while True:
        field = await reader.next()
        if not field:
            break

        if field.name == 'payload':
            payload_field = field
        elif field.name == 'token':
            token = (await field.read(decode=True)).decode("utf-8").strip()
        elif field.name == 'topic':
            topic = (await field.read(decode=True)).decode("utf-8").strip()

    if not payload_field:
        return web.Response(text="Expected an 'payload' field", status=400)

    with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as tmp_file:
        while True:
            chunk = await payload_field.read_chunk()
            if not chunk:
                break
            tmp_file.write(chunk)
        tmp_path = tmp_file.name

    try:
        result_text = transcribe_file(tmp_path)
        if result_text:
            send_to_summarizer(result_text, topic=topic, token=token)
        return web.json_response({"text": result_text})
    finally:
        os.remove(tmp_path)


async def start_servers():
    # WebSocket server
    ws_server = websockets.serve(ws_handler, "0.0.0.0", 8000)

    # HTTP server
    app = web.Application()
    cors = aiohttp_cors.setup(app, defaults={
        "*": ResourceOptions(
            allow_credentials=True,
            expose_headers="*",
            allow_headers="*",
        )
    })

    # Register routes
    route = app.router.add_post("/upload", http_transcribe)
    cors.add(route)

    runner = web.AppRunner(app)
    await runner.setup()
    site = web.TCPSite(runner, '0.0.0.0', 8005)

    print("🚀 Запуск серверов:")
    print("   📡 WebSocket на ws://0.0.0.0:8000")
    print("   🌐 HTTP POST /upload на http://0.0.0.0:8005")

    await ws_server
    await site.start()
    await asyncio.Event().wait()

grpc_channel = grpc.insecure_channel("localhost:5002")
summarizer_stub = pb2_grpc.SummarizerServiceStub(grpc_channel)

if __name__ == "__main__":
    asyncio.run(start_servers())


