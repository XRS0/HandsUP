import { RootState, store } from "@/app/Store/store"
import Socket from "./models/socket";
import { socketAction } from "./types";
import { socketSliceActions } from "./slice";
import { Middleware } from "@reduxjs/toolkit";

export const socketMiddleware = (socket: Socket): Middleware<{}, RootState> => (params) => (next) => (action) => {
  // const { dispatch, getState } = params;
  const wsAction = action as socketAction;

  switch (wsAction.type) {
    case 'socket/connect':
      socket.connect('ws://localhost:8080/ws');

      socket.on('open', () => {
        console.log("[WS]: Connection opened");
      });
      
      socket.on('message', (event) => {
        try {
          const message = JSON.parse(event.data);
          console.log(message);
          if (message.type === "incomingMessage") store.dispatch(socketSliceActions.handleMessage(message.payload));
          
        } catch (err) {
          console.error("[WS]: Parsing json error:", err);
        }
      });

      socket.on('close', () => {
        console.log("[WS]: Connection closed");
      });
      break;

    case 'socket/disconnect':
      socket.disconnect();
      break;
    
    case 'socket/sendMessage':
      socket.send(wsAction.payload);
      break;

    default:
      break
  }

  return next(action)
}