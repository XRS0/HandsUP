import { RootState } from '@/app/store';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

type WebSocketState = {
  message: string;     // it's a splited arr of message
  newMessage: string;
  isRecording: boolean;
  isEditingNow: boolean;    // if user wants to edit text
}

const initialState: WebSocketState = {
  message: "",
  newMessage: '',   //проверяться через новое сообщение, если чел отменил то мы откатываемся до сообщения
  isRecording: false,
  isEditingNow: false
};

const socketSlice = createSlice({
  name: "ws",
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<string>) {
      state.message = action.payload;
    },
    allowEdit(state) {
      state.isEditingNow = !state.isEditingNow;
    },
    editMessage(state, action: PayloadAction<string>) {
      state.newMessage = action.payload;
    },
    setMessage(state) {
      state.message = state.newMessage;
      state.newMessage = "";
    },
    cancelMessage(state) {
      state.newMessage = "";
      state.isEditingNow = false;
    },
    handleOpen(state) {
      state.message = "";
      state.isRecording = true;
    },
    handlePause(state) {
      state.isRecording = false;
    },
  }
});

export const SocketSliceActions = {
  ...socketSlice.actions,
  handleMessage: createAction<string>(`${socketSlice.name}/handleMessage`),
};

export default socketSlice.reducer;

export const selectMessage = (state: RootState) => state.socket.message;