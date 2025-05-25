import { put, takeEvery } from "redux-saga/effects";
import { socketSliceActions } from "./slice";

export function* handleRecievedMessage(action: { payload: string }) {
  yield put(socketSliceActions.addMessage(action.payload));
}

export default function* watchWsStatus() {
  yield takeEvery(socketSliceActions.handleMessage, handleRecievedMessage);
}