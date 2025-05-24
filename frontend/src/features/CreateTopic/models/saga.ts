import { registerTopicApiInstance } from "@/app/api/registerTopicApi";
import { topicSliceActions } from "@/features/UserTopics/models/slice";
import { TopicPreview } from "@/features/UserTopics/types/topic";
import { call, put, takeLatest } from "redux-saga/effects";

export function* getTopicSaga({payload}: {payload: TopicPreview}) {
  try {
    const token: string = yield localStorage.getItem("access_token");
    if (token) throw new Error("Can't get token from localStorage");

    const response: [] = yield call(registerTopicApiInstance, payload, token);  // give them type when i will
    console.log(response);

    yield put(topicSliceActions.cashTopic(response));
  } catch (error: any) {
    console.error(error.message);
  }
}

export default function* watchRegisterTopic() {
  yield takeLatest(topicSliceActions.registerTopic, getTopicSaga);
}