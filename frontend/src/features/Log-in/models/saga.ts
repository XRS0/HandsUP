import { call, put, takeEvery } from "redux-saga/effects";
import { JwtPayloadWithToken } from "@/features/types";
import { AxiosResponse } from "axios";
import { loginApiInstance } from "@/app/api/registerApi";
import { LoginActions } from "./slice";


function* fetchAuthSaga({ payload }: ReturnType<typeof LoginActions.fetchLoginRequest>) {
  try {
    const token: string = yield localStorage.getItem("token");

    if (!token) throw new Error("jwt is not defined");

    const jwt: AxiosResponse<string, null> = yield call(loginApiInstance, payload, token);
    const formattedData: JwtPayloadWithToken = yield JSON.parse(atob(jwt.data)) + { jwt: jwt.data};

    yield put(LoginActions.fetchLoginSuccess(formattedData));
  } catch (error: any) {
    console.error(error);
    yield put(LoginActions.fetchLoginFailure(error.message));
  }
}

export function* watchFetchRegister() {
  yield takeEvery(LoginActions.fetchLoginRequest, fetchAuthSaga);
}

//ReturnType<typeof fetchRegisterRequest>