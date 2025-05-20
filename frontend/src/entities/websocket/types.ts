//Types for websocket
// export type callbackListener = (data: any) => void;
export type ActionType = "socket/connect" | "socket/disconnect" | "socket/sendMessage";

type sendData = {
  payload: {
    data: Blob;
  }
}

type connectData = {
  url: string
}

type socketActionType = {
  "socket/connect": connectData,
  "socket/disconnect": "",
  "socket/sendMessage": sendData,
}

export type socketAction = {
  [T in ActionType]: {type: T} & socketActionType[T];
}[ActionType];

// export type messageType = { socketName: string, message: any }