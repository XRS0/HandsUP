import { RootState } from '@/app/store';
import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';

export type WebSocketState = {
  message: string;     // it's a splited arr of message
  newMessage: string;
  isRecording: boolean;
  isEditingNow: boolean;    // if user wants to edit text
}

export const initialState: WebSocketState = {
  message: "",
  newMessage: '',
  isRecording: false,
  isEditingNow: false
};

const socketSlice = createSlice({
  name: "ws",
  initialState,
  reducers: {
    addMessage(state, action: PayloadAction<{text: string, is_updated: boolean}>) {
      if (action.payload.text) {
        if (action.payload.is_updated) state.message = action.payload.text;
        else state.message += action.payload.text;
      }
      else state.message += action.payload;
    },
    allowEdit(state) {
      state.isEditingNow = !state.isEditingNow;
    },
    editMessage(state, action: PayloadAction<string>) {
      state.newMessage = action.payload;
    },
    cancelMessage(state) {
      state.newMessage = "";
      state.isEditingNow = false;
    },
    setMessage(state) {
      state.message = state.newMessage;
      state.newMessage = "";
    },
    handleOpen(state) {
      state.message = "";
      state.isRecording = true;
    },
    handlePause(state) {
      state.isRecording = !state.isRecording;
    },
  }
});

export const SocketSliceActions = {
  ...socketSlice.actions,
  // handleMessage: createAction<string>(`${socketSlice.name}/handleMessage`),
  uploadMessage: createAction<File>(`${socketSlice.name}/uploadMessage`),
};

export default socketSlice.reducer;

export const selectMessage = (state: RootState) => state.socket.message;