import { put, takeEvery } from "redux-saga/effects";
import { messageType } from "./types";
import { socketSliceActions } from "./slice";

export function* handleRecievedMessage(action: { payload: messageType }) {
  const { message, socketName } = action.payload;
  yield put(socketSliceActions.addMessage({ socketName, message }));
}

export default function* watchWsStatus() {
  yield takeEvery(socketSliceActions.handleMessage, handleRecievedMessage);
}