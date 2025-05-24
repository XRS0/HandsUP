import { store } from "@/app/Store/store"
import { globalSocket } from "@/entities/websocket/middleware";
import { socketSliceActions } from "@/entities/websocket/slice";
import RecordRTC, { StereoAudioRecorder } from "recordrtc"

let recorder: RecordRTC;

export async function startRecording() {
  try {
    const stream = await navigator.mediaDevices.getUserMedia({ audio: true })
    
    recorder = new RecordRTC(stream, {
      type: 'audio',
      mimeType: 'audio/wav',
      timeSlice: 500,
      desiredSampRate: 16000,
      numberOfAudioChannels: 1,
      recorderType: StereoAudioRecorder,
      ondataavailable: async (blob) => {
        const pcmData = new Uint8Array(await blob.arrayBuffer()).slice(44);
        globalSocket.send(pcmData);
        console.log("[WS] Sended data:", pcmData);
      }
    });

    continueRecording();
  } catch (error) {
    console.error('Error accessing media devices:', error);
  }
}

export const continueRecording = () => {
  recorder.startRecording();
  store.dispatch(socketSliceActions.handleOpen())
}

export const pauseRecording = () => {
  recorder.pauseRecording();
  store.dispatch(socketSliceActions.handlePause());
}

export const stopRecording = () => {
  recorder.stopRecording();
  store.dispatch(socketSliceActions.handlePause());
}


// now we need to send raw pcm without converting to base64

// const handleDataAvailable = async (blob: Blob) => {
//   recorder.startRecording();
//   if (!blob.size) return console.error("blob size is null");

//   const base64 = await blobToBase64(blob);
//   store.dispatch(socketSliceActions.handleAvaliableData(base64));
// }

// function blobToBase64(blob: Blob): Promise<string> {
//   return new Promise<string>((resolve, reject) => {
//     const reader = new FileReader();
//     reader.readAsDataURL(blob);
//     reader.onload = () => {
//       if (typeof reader.result === "string") {
//         const base64String = reader.result.split(',')[1];
//         resolve(base64String);
//       }
//     };
//     reader.onerror = (error) => reject(error);
//   });
// }

