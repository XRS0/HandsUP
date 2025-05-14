//Types for websocket
import { PayloadAction } from "@reduxjs/toolkit";

export type callbackListener = (data: any) => void;

//первое про рендер текста при записи, второе про передачу суммаризованного текста
export type socketNameType = "recordingConnection" | "sumConection";
export type ActionType = "WS_CONNECT" | "WS_DISCONNECT" | "WS_SEND_MESSAGE";

type connectData = {
  payload: {
    url: string;
    socketName: socketNameType;
  }
}

type disconnectData = {
  payload: {
    socketName: socketNameType;
  }
}

type sendData = {
  payload: {
    socket: WebSocket;
    message: any;
  }
}

type socketActionType = {
  "WS_CONNECT": connectData,
  "WS_DISCONNECT": disconnectData,
  "WS_SEND_MESSAGE": sendData,
}

export type socketAction = {
  [T in ActionType]: {type: T} & socketActionType[T];
}[ActionType];


export type messageType = { socketName: string, message: any }