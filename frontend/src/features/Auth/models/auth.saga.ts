import { takeLatest } from 'redux-saga/effects';
import { fetchRegisterSaga } from './signUp.saga';
import { fetchSignInSaga } from './signIn.saga';
import { AuthSliceActions } from './slice';

function* watchAuth() {
  yield takeLatest(AuthSliceActions.fetchSignUpRequest, fetchRegisterSaga);
  yield takeLatest(AuthSliceActions.fetchSignInRequest, fetchSignInSaga);
}

export default watchAuth;