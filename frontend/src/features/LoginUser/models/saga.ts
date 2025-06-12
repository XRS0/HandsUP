import { call, put, takeLatest } from "redux-saga/effects";
import { loginApiInstance } from "@/entities/axios/authApi";
import { LoginSliceActions } from "./slice";

export function* SignInSaga({ payload }: ReturnType<typeof LoginSliceActions.fetchRequest>) {
  try {
    const token: string = yield localStorage.getItem("token");
    const response: { token: string, message: string } = yield call(loginApiInstance, payload, token);
    
    if (response.message !== "Already authorized" && response.token) {
      yield localStorage.setItem("token", response.token);
    }

    yield put(LoginSliceActions.fetchSuccess());
  } catch (error: any) {
    console.error(error);
    yield put(LoginSliceActions.fetchFailure(error.message));
  }
}

export default function* watchLogin() {
  yield takeLatest(LoginSliceActions.fetchRequest, SignInSaga);
}