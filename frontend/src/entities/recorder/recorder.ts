import { store } from "@/app/Store/store"
import RecordRTC, { StereoAudioRecorder } from "recordrtc"
import { socketSliceActions } from "../websocket/slice";

export async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    
    let recorder = new RecordRTC(stream, {
      type: 'audio',
      recorderType: StereoAudioRecorder,
      mimeType: 'audio/wav',
      timeSlice: 500,
      desiredSampRate: 16000,
      numberOfAudioChannels: 1,
      ondataavailable: handleDataAvailable
    });

    recorder.startRecording();
  } catch (error) {
    console.error('Error accessing media devices:', error);
  }
}

const handleDataAvailable = async (blob: Blob) => {
  if (!blob.size) return console.error("blob size is null");

  const base64 = await blobToBase64(blob);

  store.dispatch(socketSliceActions.handleAvaliableData(base64));
}

function blobToBase64(blob: Blob): Promise<string> {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(blob);
    reader.onload = () => {
      if (typeof reader.result === "string") {
        const base64String = reader.result.split(',')[1];
      resolve(base64String);
      }
    };
    reader.onerror = (error) => reject(error);
  });
}

// export const stopRecording = () => {
//   store.dispatch(socketSliceActions.handleClose(recorder));
// }