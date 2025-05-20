import { put, takeEvery } from "redux-saga/effects";
import { socketSliceActions } from "./slice";
import { store } from "@/app/Store/store";

export function* handleRecievedMessage(action: { payload: string }) {
  console.log(action.payload);
  yield put(socketSliceActions.addMessage(action.payload));
}

function* sendMessage(action: { payload: Blob }) {
  const event = action.payload;

  if (event.size > 0) {
    console.log('blob', event);
    store.dispatch({ type: 'socket/sendMessage', payload: { data: event } })
  }
}

export default function* watchWsStatus() {
  yield takeEvery(socketSliceActions.handleAvaliableData, sendMessage);
  yield takeEvery(socketSliceActions.handleMessage, handleRecievedMessage);
}