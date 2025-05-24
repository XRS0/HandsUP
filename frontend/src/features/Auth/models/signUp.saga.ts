import { call, put } from "redux-saga/effects";
import { JWT } from "@/features/Auth/types/auth";
import { registerApiInstance } from "@/app/api/authApi";
import { AuthSliceActions } from "./slice";

export function* fetchRegisterSaga({ payload }: ReturnType<typeof AuthSliceActions.fetchSignUpRequest>) {
  try {
    const response: {message: string} & JWT = yield call(registerApiInstance, payload);
    console.log(response);

    yield localStorage.setItem("access_token", response.access_token);
    yield put(AuthSliceActions.fetchSuccess(response.access_token));
  } catch (error: any) {
    console.error(error);
    yield put(AuthSliceActions.fetchFailure(error.message));
  }
}
//ReturnType<typeof AuthSlice.fetchSignUpRequest>