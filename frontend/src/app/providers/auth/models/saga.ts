import { getUserTokenApiInstance, updateUserTokenApiInstance } from "@/app/api/getUserApi";
import { AuthSliceActions } from "@/features/Auth/models/slice";
import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

export function* getUserSaga() {
  try {
    const access_token: string = yield localStorage.getItem("access_token");
    if (!access_token) throw new Error("tokens is not defined");
    const response: AxiosResponse<any, any> = yield call(getUserTokenApiInstance, access_token);
    console.log(response);

    if (response.status !== 200) {
      yield put(AuthSliceActions.getRefreshToken());
    } else if (response.status === 200) {
      yield put(AuthSliceActions.getUserSucess(access_token));
    }
  } catch (error: any) {
    console.error(error);
    yield put(AuthSliceActions.fetchAuthFailure(error.message));
  }
}

export function* getRefreshToken() {
  try {
    const response: string = yield call(updateUserTokenApiInstance);
    yield put(AuthSliceActions.getUserSucess(response));
  } catch (error: any) {
    console.error(error);
    yield put(AuthSliceActions.fetchAuthFailure(error.message));
  }
}

export default function* watchFetchLogin() {
  yield takeEvery(AuthSliceActions.getUser, getUserSaga);
}