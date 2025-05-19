import { all } from 'redux-saga/effects';
import watchWsStatus from '@/entities/websocket/saga';
import { watchFetchRegister } from '@/features/Register/models/saga';

export default function* rootSaga() {
  yield all([
    // webSocketSaga(), old
    watchWsStatus(),
    watchFetchRegister(),
  ]);
}