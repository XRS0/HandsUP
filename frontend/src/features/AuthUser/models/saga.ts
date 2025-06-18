import { getUserApiInstance } from "@/entities/axios/getUserApi";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { IUser } from "../types";
import { selectToken, UserSliceActions } from "./slice";

export function* getUserSaga() {
  try {
    const token: string = yield select(selectToken);
    const user: IUser = yield call(getUserApiInstance, token);

    yield put(UserSliceActions.getUserSucess({ user, token }));
  } catch (error: any) {
    console.error(error);
    yield put(UserSliceActions.getUserFailure());
  }
}

export default function* watchGetUser() {
  yield takeEvery(UserSliceActions.getUser, getUserSaga);
}