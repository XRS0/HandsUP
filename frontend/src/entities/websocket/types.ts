//Types for websocket

import { MessageForGeneration } from "@/features/UserTopics/types/topic";

// export type callbackListener = (data: any) => void;
export type ActionType = "socket/connect" | "socket/disconnect" | "socket/sendMessage";

type sendData = {
  payload: ArrayBuffer;
}

type connectData = {
  url: string,
  payload: MessageForGeneration & {token: string}
}

type socketActionType = {
  "socket/connect": connectData,
  "socket/disconnect": "",
  "socket/sendMessage": sendData,
}

export type socketAction = {
  [T in ActionType]: {type: T} & socketActionType[T];
}[ActionType];