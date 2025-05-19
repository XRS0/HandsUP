import { call, put, takeEvery } from "redux-saga/effects";
import { JwtTokens } from "@/features/types";
import { AxiosResponse } from "axios";
import { loginApiInstance } from "@/app/api/authApi";
import { AuthSlice } from "./slice";

export function* fetchSignInSaga({ payload }: ReturnType<typeof AuthSlice.fetchSignInRequest>) {
  try {
    const token: string = yield localStorage.getItem("token");
    if (!token) throw new Error("jwt is not defined");

    const response: AxiosResponse<JwtTokens & {name: string}, null> = yield call(loginApiInstance, payload, token);
    console.log(response);
    
    const sucessPayload = {
      user: { ...payload, name: response.data.name },
      token: response.data.access_token
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