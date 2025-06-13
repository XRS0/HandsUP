import { put, takeEvery } from "redux-saga/effects";
import { SocketSliceActions } from "./slice";

export function* handleRecievedMessage(action: { payload: string }) {
  try {
    const data: {text: string, is_updated: boolean} = yield JSON.parse(action.payload);
    yield put(SocketSliceActions.addMessage(data));
  } catch (err: any) {
    console.error(console.error("[WS]: Parsing json error in saga:", err));
  }
}

export default function* watchWsMessage() {
  yield takeEvery(SocketSliceActions.handleMessage, handleRecievedMessage);
}