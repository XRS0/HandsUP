import { Channel, eventChannel } from "redux-saga";
import { call, fork, put, take } from "redux-saga/effects";
import WebSocketManager from "./websocket-manager";
// import { addMessage, sendMessage } from "../slice";

function createSocketChannel(socket: WebSocketManager) {
  return eventChannel(emiter => {
    const handler = (data: any) => {
      emiter(data);
    };

    socket.onMessage(handler);
    socket.connect();

    return () => {
      socket.offMessage(handler);
      socket.disconnect();
    };
  });
}

function* watchSocketMessages(socket: WebSocketManager) {
  const socketChannel: Channel<any> = yield call(createSocketChannel, socket);   //потом опять же заменить

  while (true) {
    try {
      const message: {} = yield take(socketChannel);   // изменить когда будет готова типизация
      // yield put(addMessage(message));
      yield call(handleMessages, message);
    } catch (err) {
      console.error('Error while migrating ws data:', err);
    }
  }
}

function* handleMessages(message: any) {
  console.log("привет мир");
}

export function* webSocketSaga() {
  const socket = new WebSocketManager("ws://placeholder-url");
  yield fork(watchSocketMessages, socket);

  while (true) {
    // const { payload } = yield take(sendMessage);
    // yield call([socket, socket.sendMessage], payload);
  }
}