import { call, put, takeEvery } from "redux-saga/effects";
import { JwtTokens } from "@/features/types";
import { AxiosResponse } from "axios";
import { registerApiInstance } from "@/app/api/authApi";
import { AuthSlice, userSlice } from "./slice";

export function* fetchRegisterSaga({ payload }: ReturnType<typeof AuthSlice.fetchSignUpRequest>) {
  try {
    const response: JwtTokens | null = yield call(registerApiInstance, payload);
    console.log(response);
    if (!response) throw new Error("response is null");

    yield localStorage.setItem("access_token", response.access_token);
    yield localStorage.setItem("refresh_token", response.refresh_token);

    const sucessPayload = {
      user: { ...payload },
      token: response.access_token
    }

    yield put(AuthSlice.fetchSignUpSuccess(sucessPayload));
  } catch (error: any) {
    console.error(error);
    yield put(AuthSlice.fetchSignUpFailure(error.message));
  }
}

export function* watchFetchRegister() {
  yield takeEvery(AuthSlice.fetchSignUpRequest, fetchRegisterSaga);
}

//ReturnType<typeof fetchRegisterRequest>