import { call, put, takeEvery } from "redux-saga/effects";
import { JwtTokens } from "@/features/types";
import { AxiosResponse } from "axios";
import { registerApiInstance } from "@/app/api/authApi";
import { AuthSlice, userSlice } from "./slice";

export function* fetchRegisterSaga({ payload }: ReturnType<typeof AuthSlice.fetchSignUpRequest>) {
  try {
    const response: AxiosResponse<JwtTokens, null> = yield call(registerApiInstance, payload);
    console.log(response);

    yield localStorage.setItem("access_token", response.data.access_token);
    yield localStorage.setItem("refresh_token", response.data.refresh_token);

    const sucessPayload = {
      user: { ...payload },
      token: response.data.access_token
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