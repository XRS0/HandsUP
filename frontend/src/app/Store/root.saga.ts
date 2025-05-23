import { all } from 'redux-saga/effects';
import watchWsStatus from '@/entities/websocket/saga';
import { watchAuth } from '@/features/Auth';
import watchFetchLogin from '../providers/auth/models/saga';

export default function* rootSaga() {
  yield all([
    watchWsStatus(),
    watchAuth(),
    watchFetchLogin(),
  ]);
}