import { getUserApiInstance } from "@/app/api/getUserApi";
import { AuthSliceActions } from "@/features/Auth/models/slice";
import { IUser } from "@/features/Auth/types/user";
import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

export function* getUserSaga(action: any) {
  const {navigate} = action.meta;

  try {
    const access_token: string = yield localStorage.getItem("access_token");
    if (!access_token) throw new Error("access token does not exist");

    const response: AxiosResponse<IUser> = yield call(getUserApiInstance, access_token);
    console.log(response);
    // if (response.status == 401) {
    //   yield put(AuthSliceActions.getRefreshToken());
    // }
    if (response.status === 200) {
      yield put(AuthSliceActions.getUserSucess(response.data));
    }
  } catch (error: any) {
    // console.error(error);
    yield put(AuthSliceActions.fetchFailure(error.message));
    navigate('/auth', { replace: true });
  }
}

// export function* getRefreshToken() {
//   try {
//     const response: string = yield call(updateUserTokenApiInstance);
//     yield put(AuthSliceActions.fetchSuccess(response));

//     yield put(AuthSliceActions.getUser());
//   } catch (error: any) {
//     console.error(error);
//     yield put(AuthSliceActions.fetchFailure(error.message));
//   }
// }

export default function* watchFetchLogin() {
  yield takeEvery(AuthSliceActions.getUser, getUserSaga);
}