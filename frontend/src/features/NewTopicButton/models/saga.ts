import { registerTopicApiInstance } from "@/entities/axios/registerTopicApi";
import { selectToken } from "@/features/AuthUser";
import { ChatSliceActions } from "@/features/UserChat/models/slice";
import { TopicPreview } from "@/features/UserChat/types";
import { TopicSliceActions } from "@/features/UserTopics";
import { selectTopics } from "@/features/UserTopics/models/slice";
import { call, put, select, takeLatest } from "redux-saga/effects";

export function* getTopicSaga({payload}: {payload: TopicPreview}) {
  try {
    const token: string = yield select(selectToken);

    const topics: TopicPreview[] = yield select(selectTopics);
    const userTopics = topics.map(t => t.topic);
    
    if (userTopics.includes(payload.topic)) throw new Error("Name of topic was already taken");

    yield call(registerTopicApiInstance, payload, token);
    
    yield put(TopicSliceActions.addTopic(payload));
    yield put(TopicSliceActions.switchTopic(payload.topic));
    yield put(ChatSliceActions.cashTopic({[payload.topic]: []}));
    yield put(ChatSliceActions.switchChat(payload.topic));

  } catch (error: any) {
    if (error.message === "Name of topic was already taken") {
      yield put(TopicSliceActions.createFailure("Имя топика занято, попробуйте другое"));
    }
    console.error(error.message);
  }
}

export default function* watchRegisterTopic() {
  yield takeLatest(TopicSliceActions.registerTopic, getTopicSaga);
}