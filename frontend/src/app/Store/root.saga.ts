import { all } from 'redux-saga/effects';
import watchWsStatus from '@/entities/websocket/saga';
import { watchAuth } from '@/features/Auth';

export default function* rootSaga() {
  yield all([
    watchWsStatus(),
    watchAuth(),
  ]);
}