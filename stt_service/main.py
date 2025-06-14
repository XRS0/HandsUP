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
                toSend = {'text': text, 'is_updated': False}
                print(toSend)
                await websocket.send(json.dumps(toSend))
    finally:
        try:
            os.remove(filename)
        except Exception as e:
            print(f"⚠️ Failed to remove file {filename}: {e}")

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

# WebSocket handler
async def ws_handler(websocket):
    print("🔌 Client connected")
    buffer = np.array([], dtype=np.int16)
    try:
        async for message in websocket:
            chunk = np.frombuffer(message, dtype=np.int16)
            buffer = np.concatenate([buffer, chunk])
            if len(buffer) >= SAMPLES_PER_CHUNK:
                await transcribe_and_send(buffer[:SAMPLES_PER_CHUNK], websocket)
                buffer = buffer[SAMPLES_PER_CHUNK:]
    except websockets.ConnectionClosed:
        print("❌ Client disconnected")

# HTTP handler
async def http_transcribe(request):
    reader = await request.multipart()
    field = await reader.next()
    if field.name != 'file':
        return web.Response(text="Expected a 'file' field", status=400)

    with tempfile.NamedTemporaryFile(delete=False, suffix=".wav") as tmp_file:
        while True:
            chunk = await field.read_chunk()
            if not chunk:
                break
            tmp_file.write(chunk)
        tmp_path = tmp_file.name

    try:
        result_text = transcribe_file(tmp_path)
        return web.json_response({"text": result_text})
    finally:
        os.remove(tmp_path)

async def start_servers():
    # WebSocket server
    ws_server = websockets.serve(ws_handler, "0.0.0.0", 8000)
    
    # HTTP server
    app = web.Application()
    app.router.add_post("/upload", http_transcribe)
    runner = web.AppRunner(app)
    await runner.setup()
    site = web.TCPSite(runner, '0.0.0.0', 8001)

    print("🚀 Запуск серверов:")
    print("   📡 WebSocket на ws://0.0.0.0:8000")
    print("   🌐 HTTP POST /upload на http://0.0.0.0:8005")

    await ws_server
    await site.start()
    await asyncio.Event().wait()  # бесконечное ожидание


if __name__ == "__main__":
    asyncio.run(start_servers())

