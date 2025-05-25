import asyncio
import websockets
import json
import re
from vosk import Model, KaldiRecognizer

model = Model("model")

def remove_repeats(text):
    words = text.split()
    result = []
    for word in words:
        if not result or word != result[-1]:
            result.append(word)
    return " ".join(result)

def fix_punctuation(text):
    text = text.strip()
    if not text:
        return ""
    text = text[0].upper() + text[1:]
    if not text.endswith(('.', '!', '?')):
        text += "."
    return text

def clean_text(text):
    text = re.sub(r"\s+", " ", text)
    text = remove_repeats(text)
    text = fix_punctuation(text)
    return text

async def recognize(websocket):
    recognizer = KaldiRecognizer(model, 16000)
    recognizer.SetWords(True)

    last_partial = ""
    last_final_text = ""

    while True:
        try:
            data = await websocket.recv()
        except websockets.ConnectionClosed:
            print("Connection closed")
            break

        if isinstance(data, str):
            continue

        if recognizer.AcceptWaveform(data):
            result = json.loads(recognizer.Result())
            full_text = result.get("text", "").strip()

            # Отправить только новую часть
            if full_text.startswith(last_final_text):
                new_part = full_text[len(last_final_text):].strip()
            else:
                new_part = full_text

            cleaned = clean_text(new_part)

            if cleaned:
                await websocket.send(cleaned)
                last_final_text = full_text

            last_partial = ""

        else:
            partial = json.loads(recognizer.PartialResult()).get("partial", "").strip()
            if partial != last_partial and partial:
                await websocket.send(partial)
                last_partial = partial

async def handler(websocket):
    await recognize(websocket)

async def main():
    print("🚀 WebSocket server running on ws://0.0.0.0:8000")
    async with websockets.serve(handler, "0.0.0.0", 8000):
        await asyncio.Future()  # run forever

if __name__ == "__main__":
    asyncio.run(main())
