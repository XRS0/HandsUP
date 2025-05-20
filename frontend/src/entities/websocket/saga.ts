import { put, takeEvery } from "redux-saga/effects";
import { socketSliceActions } from "./slice";
import { blobToBase64 } from "../recorder/recorder";
import { store } from "@/app/Store/store";

export function* handleRecievedMessage(action: { payload: string }) {
  yield put(socketSliceActions.addMessage(action.payload));
}

function* sendMessage(action: { payload: Blob }) {
  const event = action.payload;

  if (event.size > 0) {
    console.log('blob', event);

    // blobToBase64(event).then(b64 => {
    //   // ws.send(b64)
    //   store.dispatch({ type: 'socket/sendMessage', payload: { data: b64 } })
    // })
  }
}

export default function* watchWsStatus() {
  yield takeEvery(socketSliceActions.handleMessage, handleRecievedMessage);
}

