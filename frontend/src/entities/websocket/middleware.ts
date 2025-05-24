import { RootState, store } from "@/app/Store/store"
import Socket from "./models/socket";
import { socketAction } from "./types";
import { socketSliceActions } from "./slice";
import { Middleware } from "@reduxjs/toolkit";

export let globalSocket: Socket; // for sending raw binary unserialized data

export const socketMiddleware = (socket: Socket): Middleware<{}, RootState> => (params) => (next) => (action) => {
  // const { dispatch, getState } = params;
  const wsAction = action as socketAction;

  globalSocket = socket;

  switch (wsAction.type) {
    case 'socket/connect':
      console.log(wsAction.url);
      
      socket.connect(wsAction.url);

      socket.on('open', () => {
        console.log("[WS]: Connection opened");
        try {
          // startRecording();  //recordrtc!
        } catch (err: any) {
          alert("Error inside ws opening: " + err.message);
        }
      });
      
      socket.on('message', (event: MessageEvent) => {
        try {
          console.log(event.data);
          // const message = JSON.parse(event.data);
          // if (typeof message === "string") 
          store.dispatch(socketSliceActions.handleMessage(event.data));
          
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