import { createAction, createSlice } from '@reduxjs/toolkit';
import { messageType } from './types';

type WebSocketState = {
  [name: string]: {
    message: any[];     // it's a splited arr of message
  }
}

const initialState: WebSocketState = {
  realtimeTextRender: {
    message: `Lorem ipsum odor amet, consectetuer adipiscing elit. Mollis potenti morbi pellentesque sodales suscipit ultricies. Tellus hac primis vestibulum aliquet platea convallis gravida, quam suspendisse. Praesent consequat`.split(" ")
  }
};

const socketSlice = createSlice({
  name: "ws",
  initialState,
  reducers: {
    addMessage: (state, action: {payload: messageType}) => {
      if (action.payload) state[action.payload.socketName].message.push(action.payload.message);
    },
    handleOpen: (state, action) => {  
      state[action.payload] = {message: []}
    },
    handleClose: (state, action) => {
      delete state[action.payload];
    },
  }
});

export const socketSliceActions = {
  ...socketSlice.actions,
  handleMessage: createAction<messageType>(`${socketSlice.name}/handleMessage`)
};

export default socketSlice.reducer;