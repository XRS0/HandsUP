import { all } from 'redux-saga/effects';
import { watchLogin } from '@/features/LoginUser';
import { watchRegister } from '@/features/RegisterUser';
import { watchGetTopics } from '@/features/UserTopics';
// import { watchWsMessage } from '@/entities/websocket';
import { watchGenerateMessage } from '@/features/UserComposer';
import { watchRegisterTopic } from '@/features/NewTopicButton';
import { watchGetUser } from '@/features/AuthUser';
import { watchGetTopic } from '@/features/UserChat';
import { watchUploadAudio } from '@/features/UserFirstAction/models/saga';

export default function* rootSaga() {
  yield all([
    watchLogin(),
    watchGetUser(),
    watchRegister(),
    watchGetTopic(),
    watchGetTopics(),
    // watchWsMessage(),
    watchUploadAudio(),
    watchRegisterTopic(),
    watchGenerateMessage(),
  ]);
}