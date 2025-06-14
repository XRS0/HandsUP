import { uploadFileApiInstance } from "@/entities/axios/uploadFileApi";
import { SocketSliceActions } from "@/entities/websocket/models/slice";
import { selectToken } from "@/features/AuthUser";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { UploadResponse } from "../types";
import { ChatSliceActions } from "@/features/UserChat/models/slice";
import { selectCurrentTopic } from "@/features/UserTopics";

function* uploadAudioSaga(action: ReturnType<typeof SocketSliceActions.uploadMessage>) {
  try {
    const formData = new FormData();  // convert to 'multipart/form-data'
    formData.append('audio', action.payload.file);

    const token: string = yield select(selectToken);
    const topic: string = yield select(selectCurrentTopic);

    const response: UploadResponse = yield call(uploadFileApiInstance, { payload: formData, topic }, token);

    yield put(ChatSliceActions.addMessage({from: true, text: response.text}))
  } catch (err) {
    console.error(err)
  }
}

export function* watchUploadAudio() {
  yield takeEvery(SocketSliceActions.uploadMessage, uploadAudioSaga)
}