import { sendMessageApiInstance } from "@/app/api/sendMessageApi";
import { selectMessage } from "@/entities/websocket/slice";
import { topicSliceActions } from "@/features/UserTopics/models/slice";
import { AxiosResponse } from "axios";
import { call, put, select, takeLatest } from "redux-saga/effects";

export function* generateMessageSaga({payload}: ReturnType<typeof topicSliceActions.generateMessage>) {
  try {
    const token: string = yield localStorage.getItem("token"); 
    const rawConspect: string = yield select(selectMessage);
    
    if (!rawConspect) throw new Error("Conspect is not defined");

    if (payload.text) yield put(topicSliceActions.addMessage({from: false, text: payload.text}));
    if (payload.user_prompt) yield put(topicSliceActions.addMessage({from: true, text: payload.user_prompt!}));
    
    yield put({type: 'socket/connect', url: process.env.WS_SUMMARISE_URL, payload: {...payload, token}});
    //const response: AxiosResponse<any> = yield call(sendMessageApiInstance, payload, token);
    // if (response.status === 200) {
    //   yield put({type: 'socket/connect', url: process.env.WS_SUMMARISE_URL});
    // }
  } catch (error: any) {
    console.error(error.message);
  }
}

export function* watchGenerateMessage() {
  yield takeLatest(topicSliceActions.generateMessage, generateMessageSaga);
}