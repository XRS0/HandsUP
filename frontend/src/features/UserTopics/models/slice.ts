import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import { TopicPreview } from '@/features/UserChat/types';

type TopicsState = {
  topics: TopicPreview[];
  isTopicCreating: boolean;
  currentTopic: string | null;
}

const initialState: TopicsState = {
  topics: [],
  currentTopic: null,
  isTopicCreating: false,
};

const topicSlice = createSlice({
  name: "topics",
  initialState,
  reducers: {
    switchTopic(state, action: PayloadAction<string>) {
      state.currentTopic = action.payload;
    },
    switchCreatingTopic(state) {
      state.isTopicCreating = !state.isTopicCreating;
    },
    setTopics(state, action: PayloadAction<TopicPreview[]>) {
      state.topics = action.payload;
    },
    addTopic(state, action: PayloadAction<TopicPreview>) {
      state.topics.push(action.payload);
      state.currentTopic = Object.keys(action.payload)[0];
      state.isTopicCreating = false;
    }
  }
});

export const TopicSliceActions = {
  ...topicSlice.actions,
  openTopic: createAction<string>(`${topicSlice.name}/openTopic`),
  registerTopic: createAction<TopicPreview>(`${topicSlice.name}/registerTopic`),
  getTopics: createAction(`${topicSlice.name}/getTopics`),
};

export default topicSlice.reducer;

export const selectCurrentTopic = ((state: RootState) => state.topics.currentTopic);
export const selectTopics = ((state: RootState) => state.topics.topics);