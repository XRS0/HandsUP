import { MessageForGeneration } from "@/features/UserChat/types";

export type ActionType = "socket/connect" | "socket/disconnect" | "socket/sendMessage";

type sendData = {
  payload: ArrayBuffer;
}

type connectData = {
  url: string,
  payload: MessageForGeneration & {token: string, topic: string} 
}

// type disconnectData = {
//   payload:  {
//     topic: string;
//     message: string;
//   }
// }

type socketActionType = {
  "socket/connect": connectData,
  "socket/disconnect": "",
  "socket/sendMessage": sendData,
}

export type socketAction = {
  [T in ActionType]: {type: T} & socketActionType[T];
}[ActionType];