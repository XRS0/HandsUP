import { call, put } from "redux-saga/effects";
import { loginApiInstance } from "@/app/api/authApi";
import { AuthSliceActions } from "./slice";

export function* fetchSignInSaga({ payload }: ReturnType<typeof AuthSliceActions.fetchSignInRequest>) {
  try {
    const token: string  = yield localStorage.getItem("token");

    const response: {token: string} & {message: string} = yield call(loginApiInstance, payload, token);
    console.log(response);
    
    if (response.message !== "Already authorized") {
      yield localStorage.setItem("token", response.token);
    }

    yield put(AuthSliceActions.fetchSuccess(response.token));
  } catch (error: any) {
    console.error(error);
    yield put(AuthSliceActions.fetchFailure(error.message));
  }
}