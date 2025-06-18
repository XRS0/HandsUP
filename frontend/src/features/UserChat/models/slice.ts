import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { MessageForGeneration, Topic, TopicMessage } from '../types';
import { getKey, getValue } from '@/shared/utils/hashMapGet';
import { RootState } from '@/app/store';

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
    switchChat(state, action: PayloadAction<{from: string, to: string}>) {
      const {from, to} = action.payload;
      const currentChatIndex = state.cachedChats.findIndex(chat => getKey(chat) === from);

      if (currentChatIndex !== -1 && state.chatMessages.length) {
        const chat = state.cachedChats[currentChatIndex];
        
        if (getValue(chat).length !== state.chatMessages.length) {
          state.cachedChats[currentChatIndex] = {[getKey(chat)]: state.chatMessages};
        }
      }
      
      const switchingChat = state.cachedChats.find(chat => getKey(chat) === to);
      if (switchingChat) state.chatMessages = getValue(switchingChat);
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
  setSumMessage: createAction(`${chatSlice.name}/setSumMessage`),
};

export default chatSlice.reducer;

export const selectChatMessages = (state: RootState) => state.chat.chatMessages;