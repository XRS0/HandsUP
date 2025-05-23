import { call, put, takeEvery } from "redux-saga/effects";
import { IUser, JWT } from "@/features/Auth/types/types";
import { registerApiInstance } from "@/app/api/authApi";
import { AuthSliceActions } from "./slice";

export function* fetchRegisterSaga({ payload }: ReturnType<typeof AuthSliceActions.fetchSignUpRequest>) {
  try {
    const response: IUser & JWT = yield call(registerApiInstance, payload);
    console.log(response);
    if (!response) throw new Error("response is null");

    yield localStorage.setItem("access_token", response.access_token);

    yield put(AuthSliceActions.fetchSuccess(response));
  } catch (error: any) {
    console.error(error);
    yield put(AuthSliceActions.fetchAuthFailure(error.message));
  }
}

export function* watchFetchRegister() {
  yield takeEvery(AuthSliceActions.fetchSignUpRequest, fetchRegisterSaga);
}

//ReturnType<typeof AuthSlice.fetchSignUpRequest>