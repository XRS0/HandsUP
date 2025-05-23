import { put, takeEvery } from "redux-saga/effects";
import { socketSliceActions } from "./slice";
import { store } from "@/app/Store/store";

export function* handleRecievedMessage(action: { payload: string }) {
  console.log(action.payload);
  yield put(socketSliceActions.addMessage(action.payload));
}

function* sendMessage(action: ReturnType<typeof socketSliceActions.handleAvaliableData>) {
  const data = action.payload;
  store.dispatch({ type: 'socket/sendMessage', payload: data })
}

export default function* watchWsStatus() {
  yield takeEvery(socketSliceActions.handleAvaliableData, sendMessage);
  yield takeEvery(socketSliceActions.handleMessage, handleRecievedMessage);
}