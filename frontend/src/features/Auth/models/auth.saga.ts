import { takeLatest } from 'redux-saga/effects';
import { AuthSlice } from './slice';
import { fetchRegisterSaga } from './signUp.saga';
import { fetchSignInSaga } from './signIn.saga';

function* watchAuth() {
  yield takeLatest(AuthSlice.fetchSignUpRequest, fetchRegisterSaga);
  yield takeLatest(AuthSlice.fetchSignInRequest, fetchSignInSaga);
}

export default watchAuth;