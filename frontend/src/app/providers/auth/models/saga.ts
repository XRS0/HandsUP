import { getUserTokenApiInstance, updateUserTokenApiInstance } from "@/app/api/getUserApi";
import { AuthSlice } from "@/features/Auth/models/slice";
import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

export function* getUserSaga() {
  try {
    const access_token: string = yield localStorage.getItem("access_token");
    if (!access_token) throw new Error("tokens is not defined");
    const response: AxiosResponse<any, any> = yield call(getUserTokenApiInstance, access_token);
    console.log(response);

    if (response.status !== 200) {
      yield put(AuthSlice.getRefreshToken());
    } else if (response.status === 200) {
      yield put(AuthSlice.getUserSucess(access_token));
    }
  } catch (error: any) {
    console.error(error);
    yield put(AuthSlice.fetchAuthFailure(error.message));
  }
}

export function* getRefreshToken() {
  try {
    const response: string = yield call(updateUserTokenApiInstance);
    yield put(AuthSlice.getUserSucess(response));
  } catch (error: any) {
    console.error(error);
    yield put(AuthSlice.fetchAuthFailure(error.message));
  }
}

export default function* watchFetchLogin() {
  yield takeEvery(AuthSlice.getUser, getUserSaga);
}