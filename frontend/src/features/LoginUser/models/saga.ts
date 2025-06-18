import { call, put, takeLatest } from "redux-saga/effects";
import { loginApiInstance } from "@/entities/axios/authApi";
import { LoginSliceActions } from "./slice";
import { UserSliceActions } from "@/features/AuthUser";

export function* SignInSaga({ payload }: ReturnType<typeof LoginSliceActions.fetchRequest>) {
  try {
    const token: string = yield localStorage.getItem("token");
    const response: { token: string, message: string } = yield call(loginApiInstance, payload, token);
    
    if (response.message !== "Already authorized" && response.token) {
      yield localStorage.setItem("token", response.token);
      yield put(UserSliceActions.setToken(response.token));
    }

    yield put(LoginSliceActions.fetchSuccess());
  } catch (error: any) {
    console.error(error);
    if (error.message === "Network Error") {
      yield put(LoginSliceActions.fetchFailure("Ошибка подключения, попробуйте позже"));
      return;
    }
    yield put(LoginSliceActions.fetchFailure(error.message));
  }
}

export default function* watchLogin() {
  yield takeLatest(LoginSliceActions.fetchRequest, SignInSaga);
}