import { registerTopicApiInstance } from "@/app/api/registerTopicApi";
import { AuthSliceActions, selectUser } from "@/features/Auth/models/slice";
import { IUser } from "@/features/Auth/types/user";
import { topicSliceActions } from "@/features/UserTopics/models/slice";
import { TopicPreview } from "@/features/UserTopics/types/topic";
import { call, put, select, takeLatest } from "redux-saga/effects";

export function* getTopicSaga({payload}: {payload: TopicPreview}) {
  try {
    const token: string = yield localStorage.getItem("token");

    const user: IUser = yield select(selectUser);

    const userTopics = user.topics.map(topic => topic.topic);
    if (userTopics.includes(payload.topic)) throw new Error("Name of topic was already taken");

    const response: {} = yield call(registerTopicApiInstance, payload, token);

    yield put(AuthSliceActions.addTopic(payload));
    yield put(topicSliceActions.cashTopic({ [payload.topic]: [] }));
    yield put(topicSliceActions.switchTopic({ [payload.topic]: [] }));
    console.log(response);
  } catch (error: any) {
    console.error(error.message);
  }
}

export default function* watchRegisterTopic() {
  yield takeLatest(topicSliceActions.registerTopic, getTopicSaga);
}