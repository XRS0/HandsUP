import { call, put, takeEvery } from "redux-saga/effects";
import { userSliceActions } from "./slice";
import { JwtPayloadWithToken } from "@/features/Register/types";
import { AxiosResponse } from "axios";
import { userApiInstance } from "@/features/Register/api";

function* fetchRegisterSaga({ payload }: ReturnType<typeof userSliceActions.fetchRegisterRequest>) {
  try {
    const jwt: AxiosResponse<string, null> = yield call(userApiInstance, payload);
      
    const formattedData: JwtPayloadWithToken = yield JSON.parse(atob(jwt.data)) + { jwt: jwt.data};

    yield put(userSliceActions.fetchRegisterSuccess(formattedData));
    // yield localStorage.setItem("user", JSON.stringify(register.data));
  } catch (error: any) {
    console.error(error);
    yield put(userSliceActions.fetchRegisterFailure(error.message));
  }
}

export function* watchFetchRegister() {
  yield takeEvery(userSliceActions.fetchRegisterRequest, fetchRegisterSaga);
}

//ReturnType<typeof fetchRegisterRequest>