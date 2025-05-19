import { call, put, takeEvery } from "redux-saga/effects";
import { JwtTokens } from "@/features/types";
import { AxiosResponse } from "axios";
import { loginApiInstance } from "@/app/api/authApi";
import { AuthSlice } from "./slice";

export function* fetchSignInSaga({ payload }: ReturnType<typeof AuthSlice.fetchSignInRequest>) {
  try {
    const token: string = yield localStorage.getItem("token");
    if (!token) throw new Error("jwt is not defined");

    const response: JwtTokens & {name: string} = yield call(loginApiInstance, payload, token);

    console.log(response);
    if (!response) throw new Error("response is null");
    
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