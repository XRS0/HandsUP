import { store } from "@/app/Store/store";
import { socketSliceActions } from "../../websocket/slice";
import { globalSocket } from "../../websocket/middleware";

let audioContext: AudioContext;
let scriptProcessor: ScriptProcessorNode;
let mediaStreamSource: MediaStreamAudioSourceNode;
let stream: MediaStream;

const SAMPLE_RATE = 16000;
const BUFFER_SIZE = 4096;

// Float32 to Int16
function float32ToInt16(float32Array: Float32Array): Int16Array {
  const int16Array = new Int16Array(float32Array.length);
  for (let i = 0; i < float32Array.length; i++) {
    const sample = Math.max(-1, Math.min(1, float32Array[i]));
    int16Array[i] = sample < 0 ? sample * 32768 : sample * 32767;
  }
  return int16Array;
}

function onAudioProcess(event: AudioProcessingEvent) {
  const pcmFloat32 = event.inputBuffer.getChannelData(0);
  const pcmInt16 = float32ToInt16(pcmFloat32);

  if (globalSocket.readyState === WebSocket.OPEN) {
    console.log("[WS] Sended data:", pcmInt16.buffer);
    globalSocket.send(pcmInt16.buffer);
  }
  
  // store.dispatch(socketSliceActions.handleAvaliableData(pcmInt16));
}

export async function startRecording() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioContext = new AudioContext({ sampleRate: SAMPLE_RATE });
    mediaStreamSource = audioContext.createMediaStreamSource(stream);
    
    scriptProcessor = audioContext.createScriptProcessor(
      BUFFER_SIZE, 
      1, 1
    );
    
    scriptProcessor.onaudioprocess = onAudioProcess;
    mediaStreamSource.connect(scriptProcessor);
    scriptProcessor.connect(audioContext.destination); // Замыкаем цепь
    
    store.dispatch(socketSliceActions.handleOpen());
  } catch (error) {
    console.error('Error accessing media devices:', error);
  }
}

export const pauseRecording = () => {
  if (scriptProcessor) {
    scriptProcessor.onaudioprocess = null;
    store.dispatch(socketSliceActions.handlePause());
  }
};

export const continueRecording = () => {
  if (scriptProcessor) {
    scriptProcessor.onaudioprocess = onAudioProcess;
    store.dispatch(socketSliceActions.handleOpen());
  }
};

export const stopRecording = () => {
  if (scriptProcessor) {
    scriptProcessor.disconnect();
    mediaStreamSource.disconnect();
    if (audioContext.state !== 'closed') audioContext.close();
    stream.getTracks().forEach(track => track.stop());
    store.dispatch(socketSliceActions.handlePause());
  }
};