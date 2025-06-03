import { put, takeEvery } from "redux-saga/effects";
import { SocketSliceActions } from "./slice";

export function* handleRecievedMessage(action: { payload: string }) {
  yield put(SocketSliceActions.addMessage(action.payload));
}

export default function* watchWsMessage() {
  yield takeEvery(SocketSliceActions.handleMessage, handleRecievedMessage);
}