import { store } from "@/app/Store/store";
import { socketSliceActions } from "../websocket/slice";
import { globalSocket } from "../websocket/middleware";

let stream: MediaStream;
let audioContext: AudioContext;
let workletNode: AudioWorkletNode | null = null;
let mediaStreamSource: MediaStreamAudioSourceNode;

export async function startRecording() {
  try {
    stream = await navigator.mediaDevices.getUserMedia({ audio: true });
    audioContext = new AudioContext({ sampleRate: 16000 });

    await audioContext.audioWorklet.addModule(
      new URL('./pcm-processor.js', import.meta.url)
    );

    workletNode = new AudioWorkletNode(audioContext, 'pcm-processor');

    workletNode.port.onmessage = (event) => {
      if (globalSocket.readyState === WebSocket.OPEN) {
        globalSocket.send(event.data);
        console.log("[WS] sended message:", event.data);
      }
    };

    mediaStreamSource = audioContext.createMediaStreamSource(stream);
    mediaStreamSource.connect(workletNode);
    
    store.dispatch(socketSliceActions.handleOpen());
  } catch (error) {
    console.error('Error inside recoreder:', error);
  }
}

export const pauseRecording = () => {
  if (workletNode) {
    workletNode.port.onmessage = null;
    console.log("[AudioWorklet]: Recording was paused");
    store.dispatch(socketSliceActions.handlePause());
  }
};

export const continueRecording = () => {
  if (workletNode) {
    workletNode.port.onmessage = (event) => {
      if (globalSocket?.readyState === WebSocket.OPEN) {
        globalSocket.send(event.data);
      }
    };
    console.log("[AudioWorklet]: Recording continues");
    store.dispatch(socketSliceActions.handleOpen());
  }
};

export const stopRecording = () => {
  if (workletNode) {
    workletNode.port.onmessage = null;
    workletNode.disconnect();
    
    if (mediaStreamSource) mediaStreamSource.disconnect(); 
    if (audioContext && audioContext.state !== 'closed') audioContext.close();
    if (stream) stream.getTracks().forEach(track => track.stop());
    
    workletNode = null;
    console.log("[AudioWorklet]: Recording was stopped");
    store.dispatch(socketSliceActions.handlePause());
  }
};