import { all } from 'redux-saga/effects';
import watchWsStatus from '@/entities/websocket/saga';

export default function* rootSaga() {
  yield all([
    // webSocketSaga(), old
    watchWsStatus(),
  ]);
}