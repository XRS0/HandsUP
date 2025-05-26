import { selectCurrentTopic, topicSliceActions } from "@/features/UserTopics/models/slice";
import { Topic } from "@/features/UserTopics/types/topic";
import { put, select, takeLatest } from "redux-saga/effects";

export function* generateMessageSaga({payload}: ReturnType<typeof topicSliceActions.generateMessage>) {
  try {
    const token: string = yield localStorage.getItem("token"); 

    if (payload.text) {
      const topic: Topic = yield select(selectCurrentTopic);
      const lastTopicMsg = Object.values(topic!)[0].filter(topic => topic.from === false).at(-1);
      if (lastTopicMsg?.text !== payload.text) yield put(topicSliceActions.addMessage({from: false, text: payload.text}));
    }
    if (payload.user_prompt) yield put(topicSliceActions.addMessage({from: true, text: payload.user_prompt!}));

    // console.log(payload.text);
    
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