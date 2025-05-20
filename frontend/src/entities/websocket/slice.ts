import { createAction, createSlice, PayloadAction } from '@reduxjs/toolkit';
import RecordRTC from 'recordrtc';

type WebSocketState = {
  message: string[];     // it's a splited arr of message
}

const initialState: WebSocketState = {
  message: `Lorem ipsum odor amet, consectetuer adipiscing elit. Mollis potenti morbi pellentesque sodales suscipit ultricies. Tellus hac primis vestibulum aliquet platea convallis gravida, quam suspendisse. Praesent consequat`.split(" ")
};

const socketSlice = createSlice({
  name: "ws",
  initialState,
  reducers: {
    addMessage: (state, action: {payload: string}) => {
      // if (action.payload) state[action.payload.socketName].message.push(action.payload.message);
      state.message.push(action.payload);
    },
    handleOpen: (state, action: PayloadAction<RecordRTC>) => {
      action.payload.startRecording();
      // state[action.payload] = {message: []}
    },
    handleClose: (state, action: PayloadAction<RecordRTC>) => {
      action.payload.startRecording();
      // delete state[action.payload];
    },
  }
});

export const socketSliceActions = {
  ...socketSlice.actions,
  handleMessage: createAction<string>(`${socketSlice.name}/handleMessage`),
  handleAvaliableData: createAction<Blob>(`${socketSlice.name}/handleAvaliableData`)
};

export default socketSlice.reducer;