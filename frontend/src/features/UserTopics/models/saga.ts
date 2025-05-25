import { call, put, takeLatest } from "redux-saga/effects";
import { topicSliceActions } from "./slice";
import { getTopicApiInstance } from "@/app/api/getTopicApi";
import { Topic } from "../types/topic";

export function* getTopicSaga({payload}: {payload: string}) {
  try {
    const token: string = yield localStorage.getItem("token");

    const response: Topic = yield call(getTopicApiInstance, payload, token);  // give them type when i will

    const formattedTopic: Topic = {
      [Object.keys(response)[0].split("_").join(" ")]: Object.values(response)[0],
    }

    console.log(formattedTopic);

    yield put(topicSliceActions.cashTopic(formattedTopic));
    yield put(topicSliceActions.switchTopic(formattedTopic));
  } catch (error: any) {
    console.error(error.message);
  }
}

export default function* watchGetTopic() {
  yield takeLatest(topicSliceActions.openTopic, getTopicSaga);
}