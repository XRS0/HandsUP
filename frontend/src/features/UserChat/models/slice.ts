import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MessageForGeneration, Topic, TopicMessage } from '../types';
import { getKey, getValue } from '@/shared/utils/hashMapGet';

export type ChatState = {
  cachedChats: Topic[];
  chatMessages: TopicMessage[];
}

export const initialState: ChatState = {
  cachedChats: [],
  chatMessages: [],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    cashTopic(state, action: PayloadAction<Topic>) {
      if (!getKey(action.payload)) return;
      state.cachedChats.push(action.payload);
    },
    switchChat(state, action: PayloadAction<string>) {
      if (!action.payload) return;

      const currentChat = state.cachedChats.find(
        chat => getKey(chat) === action.payload
      );
      if (currentChat) state.chatMessages = getValue(currentChat);
    },
    addMessage(state, action: PayloadAction<TopicMessage>) {
      if (!action.payload.text) return;
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