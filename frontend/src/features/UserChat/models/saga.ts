import { call, put, select, takeLatest } from "redux-saga/effects";
import { getTopicApiInstance } from "@/entities/axios/getTopicApi";
import { Topic } from "../types";
import { selectToken } from "@/features/AuthUser";
import { ChatSliceActions } from "./slice";
import { selectCurrentTopic, TopicSliceActions } from "@/features/UserTopics/models/slice";
import { selectMessage } from "@/entities/websocket/models/slice";

export function* getTopicSaga({payload}: {payload: string}) {
  try { 
    const token: string = yield select(selectToken);
    const response: Topic = yield call(getTopicApiInstance, payload, token);
    const currentTopic: string = yield select(selectCurrentTopic);

    yield put(TopicSliceActions.switchTopic(Object.keys(response)[0]));
    
    yield put(ChatSliceActions.cashTopic(response));
    yield put(ChatSliceActions.switchChat({to: Object.keys(response)[0], from: currentTopic}));
    
  } catch (error: any) {
    console.error(error);
  }
}

export function* setMessageSaga() {
  const message: string = yield select(selectMessage);
  yield put(ChatSliceActions.addMessage({from: false, text: message}));
}

export default function* watchGetTopic() {
  yield takeLatest(TopicSliceActions.openTopic, getTopicSaga);
  yield takeLatest(ChatSliceActions.setSumMessage, setMessageSaga);
}