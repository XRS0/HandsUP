import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MessageForGeneration, Topic, TopicMessage } from '../types';
import { getKey, getValue } from '@/shared/utils/hashMapGet';

type TopicsState = {
  cachedChats: Topic[];
  chatMessages: TopicMessage[];
}

const initialState: TopicsState = {
  cachedChats: [],
  chatMessages: [],
};

const chatSlice = createSlice({
  name: "chats",
  initialState,
  reducers: {
    cashTopic(state, action: PayloadAction<Topic>) {
      state.cachedChats.push(action.payload);
    },
    switchChat(state, action: PayloadAction<string>) {
      const currentChat = state.cachedChats.find(
        chat => getKey(chat) === action.payload
      );
      if (currentChat) state.chatMessages = getValue(currentChat);
    },
    addMessage(state, action: PayloadAction<TopicMessage>) {
      state.chatMessages.push(action.payload);
    },
  }
});

export const ChatSliceActions = {
  ...chatSlice.actions,
  generateMessage: createAction<MessageForGeneration>(`${chatSlice.name}/generateMessage`),
  setMessage: createAction(`${chatSlice.name}/setMessage`),
};

export default chatSlice.reducer;