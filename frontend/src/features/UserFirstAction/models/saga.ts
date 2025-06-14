import { uploadFileApiInstance } from "@/entities/axios/uploadFileApi";
import { SocketSliceActions } from "@/entities/websocket/models/slice";
import { selectToken } from "@/features/AuthUser";
import { AxiosResponse } from "axios";
import { call, select, takeEvery } from "redux-saga/effects";

function* uploadAudioSaga(action: ReturnType<typeof SocketSliceActions.uploadMessage>) {
  try {
    const formData = new FormData();  // convert to 'multipart/form-data'
    formData.append('audio', action.payload.file);

    const token: string = yield select(selectToken);
    const response: AxiosResponse<any> = yield call(uploadFileApiInstance, formData, token);

    console.log(response.data);
  } catch (err) {
    console.error(err)
  }
}

export function* watchUploadAudio() {
  yield takeEvery(SocketSliceActions.uploadMessage, uploadAudioSaga)
}