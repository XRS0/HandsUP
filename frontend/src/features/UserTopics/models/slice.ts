import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

type TopicsState = {
  cashedTopics: any;
  currentTopic: any;
  isTopicCreating: boolean;
}

const initialState: TopicsState = {
  cashedTopics: [],
  currentTopic: {},
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
    switchTopic(state, action: PayloadAction<any>) {
      state.currentTopic = action.payload;    // i can get my topics from cash btw
    },
    switchCreatingTopic(state) {
      state.isTopicCreating = !state.isTopicCreating;
    }
  }
});

export const topicSliceActions = {
  ...topicSlice.actions,
  openTopic: createAction<string>(`${topicSlice.name}/openTopic`),
};

export default topicSlice.reducer;