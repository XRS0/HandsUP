import { call, put, takeEvery } from "redux-saga/effects";
import { JwtPayloadWithToken } from "@/features/types";
import { AxiosResponse } from "axios";
import { registerApiInstance } from "@/app/api/registerApi";
import { RegisterActions } from "./slice";

function* fetchRegisterSaga({ payload }: ReturnType<typeof RegisterActions.fetchRegisterRequest>) {
  try {
    const jwt: AxiosResponse<string, null> = yield call(registerApiInstance, payload);
    const formattedData: JwtPayloadWithToken = yield JSON.parse(atob(jwt.data)) + { jwt: jwt.data};

    yield localStorage.setItem("token", JSON.stringify(formattedData.jwt));

    yield put(RegisterActions.fetchRegisterSuccess(formattedData));
  } catch (error: any) {
    console.error(error);
    yield put(RegisterActions.fetchRegisterFailure(error.message));
  }
}

export function* watchFetchRegister() {
  yield takeEvery(RegisterActions.fetchRegisterRequest, fetchRegisterSaga);
}

//ReturnType<typeof fetchRegisterRequest>