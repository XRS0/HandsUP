import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { topicSliceActions } from "./slice";
import { getTopicApiInstance } from "@/app/api/getTopicApi";


export function* getTopicSaga({payload}: {payload: string}) {
  try {
    const token: string = yield localStorage.getItem("access_token");
    if (token) throw new Error("Can't get token from localStorage");

    const response: [] = yield call(getTopicApiInstance, payload, token);  // give them type when i will
    console.log(response);

    yield put(topicSliceActions.cashTopic(response));
  } catch (error: any) {
    console.error(error.message);
  }
}

export default function* watchGetTopic() {
  yield takeLatest(topicSliceActions.openTopic, getTopicSaga);
}