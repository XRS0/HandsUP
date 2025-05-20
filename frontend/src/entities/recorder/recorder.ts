import { store } from "@/app/Store/store"
import RecordRTC, { StereoAudioRecorder } from "recordrtc"
import { socketSliceActions } from "../websocket/slice";

let recorder: RecordRTC;

navigator.mediaDevices.getUserMedia({ audio: true })
  .then(stream => {
    recorder = new RecordRTC(stream, {
      type: 'audio',
      recorderType: StereoAudioRecorder,
      mimeType: 'audio/wav',
      timeSlice: 500,
      desiredSampRate: 16000,
      numberOfAudioChannels: 1,
      ondataavailable: handleDataAvailable
  })
});

const handleDataAvailable = (event: Blob) => {
  store.dispatch(socketSliceActions.handleAvaliableData(event))
}

export const startRecording = () => {
  store.dispatch(socketSliceActions.handleOpen(recorder));
}

export const stopRecording = () => {
  store.dispatch(socketSliceActions.handleClose(recorder));
}

export function blobToBase64(blob: Blob) {
  return new Promise((resolve, reject) => {
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