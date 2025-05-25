import { all } from 'redux-saga/effects';
import watchWsStatus from '@/entities/websocket/saga';
import { watchAuth } from '@/features/Auth';
import watchFetchLogin from '../providers/auth/models/saga';
import { watchGetTopic } from '@/features/UserTopics';
import watchRegisterTopic from '@/features/CreateTopic/models/saga';
import { watchGenerateMessage } from '@/features/UserComposer/models/saga';

export default function* rootSaga() {
  yield all([
    watchAuth(),
    watchWsStatus(),
    watchGetTopic(),
    watchFetchLogin(),
    watchRegisterTopic(),
    watchGenerateMessage(),
  ]);
}