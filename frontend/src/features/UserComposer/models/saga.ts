import { SocketSliceActions } from "@/entities/websocket/models/slice";
import { selectToken } from "@/features/AuthUser";
import { ChatSliceActions } from "@/features/UserChat/models/slice";
import { selectCurrentTopic } from "@/features/UserTopics";
import { put, select, takeLatest } from "redux-saga/effects";

function* generateMessageSaga({payload}: ReturnType<typeof ChatSliceActions.generateMessage>) {
  try {
    const token: string = yield select(selectToken); 
    
    // if (payload.text) yield put(ChatSliceActions.addMessage({from: false, text: payload.text}));
    if (payload.user_prompt) yield put(ChatSliceActions.addMessage({from: true, text: payload.user_prompt}));
    
    yield put({type: 'socket/connect', url: process.env.WS_SUMMARISE_URL, payload: {...payload, token}});
    yield put(SocketSliceActions.setMessage());
  } catch (error: any) {
    console.error(error.message);
  }
}

export default function* watchGenerateMessage() {
  yield takeLatest(ChatSliceActions.generateMessage, generateMessageSaga);
}