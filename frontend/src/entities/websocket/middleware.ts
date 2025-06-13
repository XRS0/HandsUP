import Socket from "./models/socket";
import { socketAction } from "./types";
import { SocketSliceActions } from "./models/slice";
import { Middleware } from "@reduxjs/toolkit";
import { startRecording } from "../recorder/recorder";
import { RootState, store } from "@/app/store";
import { ChatSliceActions } from "@/features/UserChat/models/slice";

export let globalSocket: Socket; // for sending raw binary unserialized data

export const socketMiddleware = (socket: Socket): Middleware<{}, RootState> => (params) => (next) => (action) => {
  const wsAction = action as socketAction;

  globalSocket = socket;

  switch (wsAction.type) {
    case 'socket/connect':;  
      socket.connect(wsAction.url, wsAction.payload);

      socket.on('open', () => {
        console.log("[WS]: Connection opened");
        try {
          socket.readyState = 1;
          if (wsAction.url !== "ws://localhost:8083/ws/generate?") startRecording();
          else store.dispatch(SocketSliceActions.handleOpen());
        } catch (err: any) {
          alert("Error inside ws opening: " + err.message);
        }
      });
      
      socket.on('message', (event: MessageEvent) => {
        try {
          const data = JSON.parse(event.data);
          store.dispatch(SocketSliceActions.addMessage(data));
        } catch {
          store.dispatch(SocketSliceActions.addMessage(event.data));
        }
      });

      socket.on('close', () => {
        if (wsAction.url === "ws://localhost:8083/ws/generate?") {
          store.dispatch(SocketSliceActions.handlePause());
          store.dispatch(ChatSliceActions.setMessage());
        }
        // store.dispatch(SocketSliceActions.setMessage());
        socket.readyState = 0;
        socket.disconnect();
        console.log("[WS]: Connection closed");
      });
      break;

    case 'socket/disconnect':
      socket.disconnect();
      break;
    
    case 'socket/sendMessage':
      // console.log("после ответа", wsAction.payload);
      // socket.send(wsAction.payload);
      break;

    default:
      break
  }

  return next(action);
}