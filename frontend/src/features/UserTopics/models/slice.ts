import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MessageForGeneration, Topic, TopicMessage, TopicPreview } from '../types/topic';
import { RootState } from '@/app/Store/store';

type TopicsState = {
  cashedTopics: Topic[];
  currentTopic: Topic | null;
  isTopicCreating: boolean;
  markdown: { [key: string]: string[] };
  isMarkdownVisible: boolean
}

const initialState: TopicsState = {
  cashedTopics: [],
  currentTopic: null,
  isTopicCreating: false,
  markdown: {},
  isMarkdownVisible: false
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
    },
    addMarkdownToChat(state) {
      const topic = state.currentTopic;
      if (!topic) return;

      const [topicName, messages] = Object.entries(topic)[0];
      messages.push({ from: false, text: Object.values(state.markdown)[0].join("")});
      state.cashedTopics.find(t => topicName in t)?.[topicName].push({ from: false, text: Object.values(state.markdown)[0].join("")});
      state.markdown = {}
    },
    addMarkdown(state, action: PayloadAction<string>) {
      if (!state.currentTopic) return;
      const topicId = Object.keys(state.currentTopic)[0];
    
      if (!state.markdown[topicId]) {
        state.markdown[topicId] = [];
      }
      
      state.markdown[topicId].push(action.payload);
    },
    setMarkdownVisibility(state) {
      state.isMarkdownVisible = !state.isMarkdownVisible;
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