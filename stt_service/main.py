from flask import Flask, render_template
from flask_sock import Sock
import whisper
import base64
import traceback
import numpy as np
from scipy import signal
import io
import queue
import threading
import time

app = Flask(__name__)
sock = Sock(app)

model = whisper.load_model('tiny')  # Using tiny model for better performance

# Audio buffer for accumulating data
audio_buffer = queue.Queue()
BUFFER_DURATION = 5.0  # Increased buffer duration to reduce processing frequency
SAMPLE_RATE = 16000
MIN_AUDIO_LENGTH = 0.5  # Minimum audio length in seconds to process

@app.route('/')
def index():
    return render_template('index.html')

def process_wav_bytes(audio_bytes: bytes, sample_rate: int = 16000):
    # Convert bytes to numpy array
    audio_data = np.frombuffer(audio_bytes, dtype=np.int16)
    
    # Convert to float32 and normalize
    audio_data = audio_data.astype(np.float32) / 32768.0
    
    # Resample if needed
    if len(audio_data) > 0:
        # Calculate number of samples after resampling
        number_of_samples = round(len(audio_data) * float(sample_rate) / 48000)
        audio_data = signal.resample(audio_data, number_of_samples)
    
    return audio_data

def transcription_worker(ws):
    accumulated_audio = []
    last_transcription_time = time.time()
    
    while True:
        try:
            # Get audio data from buffer
            audio_chunk = audio_buffer.get(timeout=0.5)
            accumulated_audio.append(audio_chunk)
            
            # Calculate total audio length
            total_length = sum(len(chunk) for chunk in accumulated_audio) / SAMPLE_RATE
            
            # Check if we have enough data or enough time has passed
            current_time = time.time()
            if (total_length >= BUFFER_DURATION or 
                (current_time - last_transcription_time >= BUFFER_DURATION and total_length >= MIN_AUDIO_LENGTH)):
                
                # Combine all chunks
                audio_data = np.concatenate(accumulated_audio)
                
                # Process audio
                audio_data = whisper.pad_or_trim(audio_data)
                transcription = whisper.transcribe(
                    model, 
                    audio_data,
                    task="transcribe"  # Let Whisper detect language automatically
                )
                
                # Send transcription if not empty
                if transcription['text'].strip():
                    ws.send(transcription['text'])
                
                # Reset buffer
                accumulated_audio = []
                last_transcription_time = current_time
                
        except queue.Empty:
            # If buffer is empty, check if we have accumulated data to process
            if accumulated_audio:
                total_length = sum(len(chunk) for chunk in accumulated_audio) / SAMPLE_RATE
                if time.time() - last_transcription_time >= BUFFER_DURATION and total_length >= MIN_AUDIO_LENGTH:
                    audio_data = np.concatenate(accumulated_audio)
                    audio_data = whisper.pad_or_trim(audio_data)
                    transcription = whisper.transcribe(
                        model, 
                        audio_data,
                        task="transcribe"  # Let Whisper detect language automatically
                    )
                    if transcription['text'].strip():
                        ws.send(transcription['text'])
                    accumulated_audio = []
                    last_transcription_time = time.time()
            continue
        except Exception as e:
            traceback.print_exc()
            ws.send(f"Error in transcription: {str(e)}")
            break

@sock.route('/transcribe')
def transcribe_socket(ws):
    # Start transcription worker thread
    worker_thread = threading.Thread(target=transcription_worker, args=(ws,))
    worker_thread.daemon = True
    worker_thread.start()
    
    while True:
        try:
            message = ws.receive()
            if message is None:
                break
                
            if isinstance(message, str):
                message = base64.b64decode(message)
            
            # Process audio and add to buffer
            audio = process_wav_bytes(bytes(message))
            audio_buffer.put(audio)
            
        except Exception as e:
            traceback.print_exc()
            ws.send(str(e))
            break

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5003)