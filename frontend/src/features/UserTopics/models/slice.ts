import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '@/app/store';
import { TopicPreview } from '@/features/UserChat/types';

export type TopicsState = {
  topics: TopicPreview[];
  isTopicCreating: boolean;
  currentTopic: string | null;
}

export const initialState: TopicsState = {
  topics: [],
  currentTopic: null,
  isTopicCreating: false,
};

const topicSlice = createSlice({
  name: "topics",
  initialState,
  reducers: {
    switchTopic(state, action: PayloadAction<string>) {
      if (!action.payload) return;
      state.currentTopic = action.payload;
    },
    switchCreatingTopic(state) {
      state.isTopicCreating = !state.isTopicCreating;
    },
    setTopics(state, action: PayloadAction<TopicPreview[]>) {
      if (action.payload.length === 0) return;
      state.topics = action.payload;
    },
    addTopic(state, action: PayloadAction<TopicPreview>) {
      if (!action.payload.topic) return;

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