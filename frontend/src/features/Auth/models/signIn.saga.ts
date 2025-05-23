import { call, put, takeEvery } from "redux-saga/effects";
import { JwtTokens } from "@/features/types";
import { loginApiInstance } from "@/app/api/authApi";
import { AuthSlice } from "./slice";

export function* fetchSignInSaga({ payload }: ReturnType<typeof AuthSlice.fetchSignInRequest>) {
  try {
    const access_token: string = yield localStorage.getItem("access_token");
    const refresh_token: string = yield localStorage.getItem("refresh_token");

    if (!access_token || !refresh_token) throw new Error("tokens is not defined");

    const response: JwtTokens & {name: string} = yield call(loginApiInstance, payload, access_token);

    console.log(response);
    if (!response) throw new Error("response is null");

    yield localStorage.setItem("access_token", response.access_token);
    yield localStorage.setItem("refresh_token", response.refresh_token);
    
    const sucessPayload = {
      user: { ...payload, name: response.name },
      token: response.access_token
    }

    yield put(AuthSlice.fetchSignInSuccess(sucessPayload));
  } catch (error: any) {
    console.error(error);
    yield put(AuthSlice.fetchSignInFailure(error.message));
  }
}

export default function* watchFetchLogin() {
  yield takeEvery(AuthSlice.fetchSignInRequest, fetchSignInSaga);
}

//ReturnType<typeof fetchRegisterRequest>