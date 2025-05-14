import { call, put, takeEvery } from "redux-saga/effects";
import { getSuccess, getFetch } from "./slice";
// import testApi from "../../app/axios/axiosInstance";
import { AxiosResponse } from "axios";

type testData = {
  "userId": number,
  "id": number,
  "title": string,
  "completed": boolean
}

function* workGetFetch() {
  // const testData: AxiosResponse<testData, null> = yield call(testApi.get, "/5");
  // yield put(getSuccess(testData.data));
}

function* watchsaga() {
  yield takeEvery(getFetch, workGetFetch);
}

export default watchsaga;