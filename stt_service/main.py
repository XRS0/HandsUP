import asyncio
import websockets
import json
from vosk import Model, KaldiRecognizer

model = Model("model")

def clean_text(text):
    if not text:
        return ""
    text = text.strip()
    if not text:
        return ""
    text = text[0].upper() + text[1:]
    if not text.endswith("."):
        text += "."
    return text

async def recognize(websocket):
    recognizer = KaldiRecognizer(model, 16000)
    recognizer.SetWords(True)

    last_partial = ""

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
            text = clean_text(result.get("text", ""))
            if text:
                await websocket.send(text)
            last_partial = ""
        else:
            partial = json.loads(recognizer.PartialResult()).get("partial", "")
            if partial != last_partial:
                await websocket.send(partial)
                last_partial = partial

async def handler(websocket):
    await recognize(websocket)

async def main():
    print("Starting WebSocket server on ws://0.0.0.0:8000")
    async with websockets.serve(handler, "0.0.0.0", 8000):
        await asyncio.Future()

if __name__ == "__main__":
    asyncio.run(main())

