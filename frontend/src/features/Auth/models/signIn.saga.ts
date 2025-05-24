import { call, put } from "redux-saga/effects";
import {  JWT } from "@/features/Auth/types/auth";
import { loginApiInstance } from "@/app/api/authApi";
import { AuthSliceActions } from "./slice";

export function* fetchSignInSaga({ payload }: ReturnType<typeof AuthSliceActions.fetchSignInRequest>) {
  try {
    const data: {message: string, token: string} = yield localStorage.getItem("access_token");

    const response: JWT = yield call(loginApiInstance, payload, data.token);
    console.log(response);

    yield localStorage.setItem("access_token", response.access_token);

    yield put(AuthSliceActions.fetchSuccess(response.access_token));
  } catch (error: any) {
    console.error(error);
    yield put(AuthSliceActions.fetchFailure(error.message));
  }
}