import { call, put, takeEvery } from "redux-saga/effects";
import { IUser, JWT } from "@/features/Auth/types/types";
import { loginApiInstance } from "@/app/api/authApi";
import { AuthSlice } from "./slice";

export function* fetchSignInSaga({ payload }: ReturnType<typeof AuthSlice.fetchSignInRequest>) {
  try {
    const access_token: string = yield localStorage.getItem("access_token");

    if (!access_token) throw new Error("token is not defined");

    const response: IUser & JWT = yield call(loginApiInstance, payload);

    console.log(response);
    if (!response) throw new Error("response is null");

    yield localStorage.setItem("access_token", response.access_token);

    yield put(AuthSlice.fetchSuccess(response));
  } catch (error: any) {
    console.error(error);
    yield put(AuthSlice.fetchAuthFailure(error.message));
  }
}

export default function* watchFetchLogin() {
  yield takeEvery(AuthSlice.fetchSignInRequest, fetchSignInSaga);
}

//ReturnType<typeof fetchRegisterRequest>