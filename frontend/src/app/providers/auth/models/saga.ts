import { getAllTopicApiInstance } from "@/app/api/getTopicApi";
import { getUserApiInstance } from "@/app/api/getUserApi";
import { AuthSliceActions } from "@/features/Auth/models/slice";
import { IUser } from "@/features/Auth/types/user";
import { TopicPreview } from "@/features/UserTopics/types/topic";
import { AxiosResponse } from "axios";
import { call, put, takeEvery } from "redux-saga/effects";

export function* getUserSaga(action: any) {
  const {navigate} = action.meta;

  try {
    const access_token: string = yield localStorage.getItem("token");

    const user: AxiosResponse<IUser> = yield call(getUserApiInstance, access_token);
    const topics: AxiosResponse<{chats: TopicPreview[]}> = yield call(getAllTopicApiInstance, access_token);

    if (!topics.data.chats) {
      yield put(AuthSliceActions.getUserSucess({user: user.data, topics: []}));
    } else {
    // My_Topic_4 => My Topic 4
      const formattedTopics: TopicPreview[] = topics.data.chats.map(topic => ({
        topic: topic.topic.split("_").join(" "),
        created_at: topic.created_at
      }));

      yield put(AuthSliceActions.getUserSucess({user: user.data, topics: formattedTopics}));
    }
  } catch (error: any) {
    console.log(error);
    yield put(AuthSliceActions.fetchFailure(error.message));
    navigate('/auth', { replace: true });
  }
}

export default function* watchFetchLogin() {
  yield takeEvery(AuthSliceActions.getUser, getUserSaga);
}