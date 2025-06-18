import { call, put, select, takeEvery } from "redux-saga/effects";
import { TopicSliceActions } from "./slice";
import { selectToken } from "@/features/AuthUser";
import { getAllTopicApiInstance } from "@/entities/axios/getTopicApi";
import { TopicPreview } from "@/features/UserChat/types";

export function* getUserTopicsSaga() {
  try {
    const token: string = yield select(selectToken);
    const response: {chats: TopicPreview[]} = yield call(getAllTopicApiInstance, token);

    yield put(TopicSliceActions.setTopics(response.chats));
    // yield put(ChatSliceActions.cashTopic(response.chats));
  } catch (error: any) {
    yield put(TopicSliceActions.createFailure("Ошибка загрузки топиков"));
  }
}

export default function* watchGetTopics() {
  yield takeEvery(TopicSliceActions.getTopics, getUserTopicsSaga);
}