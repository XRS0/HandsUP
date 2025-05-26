import { RootState, store } from "@/app/Store/store"
import Socket from "./models/socket";
import { socketAction } from "./types";
import { socketSliceActions } from "./slice";
import { Middleware } from "@reduxjs/toolkit";
import { startRecording } from "../recorder/recorder";
import { topicSliceActions } from "@/features/UserTopics/models/slice";

export let globalSocket: Socket; // for sending raw binary unserialized data

export const socketMiddleware = (socket: Socket): Middleware<{}, RootState> => (params) => (next) => (action) => {
  const wsAction = action as socketAction;

  globalSocket = socket;

  switch (wsAction.type) {
    case 'socket/connect':
      console.log(wsAction.url);
      
      socket.connect(wsAction.url, wsAction.payload);

      socket.on('open', () => {
        console.log("[WS]: Connection opened");
        try {
          socket.readyState = 1;
          if (wsAction.url !== "ws://localhost:8083/ws/generate?") startRecording();
          else store.dispatch(topicSliceActions.setMarkdownVisibility());
        } catch (err: any) {
          alert("Error inside ws opening: " + err.message);
        }
      });
      
      socket.on('message', (event: MessageEvent) => {
        try {
          if (wsAction.url === "ws://localhost:8083/ws/generate?") {
            store.dispatch(topicSliceActions.addMarkdown(event.data));
          } else {
            store.dispatch(socketSliceActions.handleMessage(event.data));
          }
        } catch (err) {
          console.error("[WS]: Parsing json error:", err);
        }
      });

      socket.on('close', () => {
        if (wsAction.url === "ws://localhost:8083/ws/generate?") {
          store.dispatch(topicSliceActions.setMarkdownVisibility());
          store.dispatch(topicSliceActions.addMarkdownToChat());
        }
        console.log("[WS]: Connection closed");
        socket.readyState = 0;
      });
      break;

    case 'socket/disconnect':
      socket.disconnect();
      break;
    
    case 'socket/sendMessage':
      console.log("после ответа", wsAction.payload);
      socket.send(wsAction.payload);
      break;

    default:
      break
  }

  return next(action);
}