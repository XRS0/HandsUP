import { call, put, select, takeEvery } from "redux-saga/effects";
import { TopicSliceActions } from "./slice";
import { selectToken } from "@/features/AuthUser";
import { getAllTopicApiInstance } from "@/entities/axios/getTopicApi";
import { TopicPreview } from "@/features/UserChat/types";

export function* getUserTopicsSaga() {
  try {
    const token: string = yield select(selectToken);
    const response: TopicPreview[] = yield call(getAllTopicApiInstance, token);

    yield put(TopicSliceActions.setTopics(response));
  } catch (error: any) {
    console.error(error);
  }
}

export default function* watchGetTopics() {
  yield takeEvery(TopicSliceActions.getTopics, getUserTopicsSaga);
}