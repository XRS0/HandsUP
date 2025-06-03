import { call, put, takeLatest } from "redux-saga/effects";
import { registerApiInstance } from "@/entities/axios/authApi";
import { RegisterSliceActions } from "./slice";

export function* registerSaga({ payload }: ReturnType<typeof RegisterSliceActions.fetchRequest>) {
  try {
    const response: {message: string, token: string} = yield call(registerApiInstance, payload);
    
    yield localStorage.setItem("token", response.token);

    yield put(RegisterSliceActions.fetchSuccess(response.token));
  } catch (error: any) {
    console.error(error);
    yield put(RegisterSliceActions.fetchFailure(error.message));
  }
}

export default function* watchRegister() {
  yield takeLatest(RegisterSliceActions.fetchRequest, registerSaga);
}