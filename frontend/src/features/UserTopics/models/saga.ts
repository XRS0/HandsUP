import { call, put, select, takeEvery } from "redux-saga/effects";
import { TopicSliceActions } from "./slice";
import { selectToken } from "@/features/AuthUser";
import { getAllTopicApiInstance } from "@/entities/axios/getTopicApi";
import { TopicPreview } from "@/features/UserChat/types";
import { ChatSliceActions } from "@/features/UserChat/models/slice";

export function* getUserTopicsSaga() {
  try {
    const token: string = yield select(selectToken);
    const response: {chats: TopicPreview[]} = yield call(getAllTopicApiInstance, token);

    yield put(TopicSliceActions.setTopics(response.chats));
    // yield put(ChatSliceActions.cashTopic(response.chats));
  } catch (error: any) {
    yield put(TopicSliceActions.createFailure("Ошибка создания топика"));
    // добавить err для одинакового названия топика
  }
}

export default function* watchGetTopics() {
  yield takeEvery(TopicSliceActions.getTopics, getUserTopicsSaga);
}