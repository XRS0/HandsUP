import { createAction, createSlice, current, PayloadAction } from '@reduxjs/toolkit';
import { MessageForGeneration, Topic, TopicMessage, TopicPreview } from '../types/topic';
import { RootState } from '@/app/Store/store';

type TopicsState = {
  cashedTopics: Topic[];
  currentTopic: Topic | null;
  isTopicCreating: boolean;
}

const initialState: TopicsState = {
  cashedTopics: [],
  currentTopic: null,
  isTopicCreating: false
};

const topicSlice = createSlice({
  name: "topics",
  initialState,
  reducers: {
    cashTopic(state, action: PayloadAction<any>) {
      state.cashedTopics.push(action.payload);
      state.currentTopic = action.payload;
    },
    switchTopic(state, action: PayloadAction<Topic>) {
      state.currentTopic = action.payload;    // i can get my topics from cash btw
    },
    switchCreatingTopic(state) {
      state.isTopicCreating = !state.isTopicCreating;
    },
    addMessage(state, action: PayloadAction<TopicMessage>) {
      const topic = state.currentTopic;
      if (!topic) return;

      const [topicName, messages] = Object.entries(topic)[0];
      messages.push(action.payload);
      state.cashedTopics.find(t => topicName in t)?.[topicName].push(action.payload);
    }
  }
});

export const topicSliceActions = {
  ...topicSlice.actions,
  openTopic: createAction<string>(`${topicSlice.name}/openTopic`),
  registerTopic: createAction<TopicPreview>(`${topicSlice.name}/registerTopic`),
  generateMessage: createAction<MessageForGeneration>(`${topicSlice.name}/generateMessage`),
};

export default topicSlice.reducer;

export const selectCurrentTopic = ((state: RootState) => state.topics.currentTopic);