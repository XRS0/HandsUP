import { call, put, select, takeLatest } from "redux-saga/effects";
import { selectCurrentTopic, topicSliceActions } from "./slice";
import { getTopicApiInstance } from "@/app/api/getTopicApi";
import { MessageForGeneration, Topic } from "../types/topic";
import { selectMessage } from "@/entities/websocket/slice";
import { sendMessageApiInstance } from "@/app/api/sendMessageApi";

export function* getTopicSaga({payload}: {payload: string}) {
  try {
    const token: string = yield localStorage.getItem("token");

    const response: Topic = yield call(getTopicApiInstance, payload, token);  // give them type when i will
    console.log(response);

    yield put(topicSliceActions.cashTopic(response));
    yield put(topicSliceActions.switchTopic(response));
  } catch (error: any) {
    console.error(error.message);
  }
}

export function* generateMessageSaga({payload}: ReturnType<typeof topicSliceActions.generateMessage>) {
  try {
    const token: string = yield localStorage.getItem("token"); 
    const rawConspect: string = yield select(selectMessage);

    if (!rawConspect) throw new Error("Conspect is not defined");

    const topicName: Topic = yield select(selectCurrentTopic);

    const message: MessageForGeneration = {
      topicName: Object.keys(topicName)[0],
      message: rawConspect,
      prompt: payload
    }

    if (payload) {
      yield put(topicSliceActions.addMessage({from: "user", message: payload}))
    }
    const response: [] = yield call(sendMessageApiInstance, message, token);
    console.log(response);
  } catch (error: any) {
    console.error(error.message);
  }
}

export default function* watchGetTopic() {
  yield takeLatest(topicSliceActions.generateMessage, generateMessageSaga);
}