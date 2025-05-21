import { call, put, takeEvery } from "redux-saga/effects";
import { IUser, JWT } from "@/features/Auth/types/types";
import { registerApiInstance } from "@/app/api/authApi";
import { AuthSlice } from "./slice";

export function* fetchRegisterSaga({ payload }: ReturnType<typeof AuthSlice.fetchSignUpRequest>) {
  try {
    const response: IUser & JWT = yield call(registerApiInstance, payload);
    console.log(response);
    if (!response) throw new Error("response is null");

    yield localStorage.setItem("access_token", response.access_token);

    yield put(AuthSlice.fetchSuccess(response));
  } catch (error: any) {
    console.error(error);
    yield put(AuthSlice.fetchAuthFailure(error.message));
  }
}

export function* watchFetchRegister() {
  yield takeEvery(AuthSlice.fetchSignUpRequest, fetchRegisterSaga);
}

//ReturnType<typeof AuthSlice.fetchSignUpRequest>