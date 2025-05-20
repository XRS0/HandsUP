
// const sockets: Record<string, WebSocket> = {};

// export const websocketMiddleware: Middleware<{}, RootState> = (store) => (next) => (action) => {
//   const wsAction = action as socketAction;

//   switch (wsAction.type) {
//     case "WS_CONNECT": {
//       const {url, socketName} = wsAction.payload;

//       // в объекте открытых соединений ищем совпадение и закрываем, если находим
//       if (sockets[socketName]) sockets[socketName].close();

//       const socket = new WebSocket(url);

//       socket.onopen = () => {
//         //console.log("[WS]: Connection has been successfully established");
//         store.dispatch(socketSliceActions.handleOpen(socketName));
//       };

//       socket.onmessage = (event => {
//         try {
//           const message = JSON.parse(event.data);
//           console.log(message);
          
//           store.dispatch({
//             type: "handleMessage",
//             payload: { socketName: message.type, message: message.data }
//           });
//         } catch (err) {
//           console.error("[WS]: Parsing json error:", err);
//         }
//       });

//       socket.onclose = () => {
//         // console.log("[WS]: Connection closed");
//         store.dispatch(socketSliceActions.handleClose(socketName));

//         delete sockets[socketName];
//       }

//       socket.onerror = (error) => {
//         console.error("[WS]: Websocket error:", error);
//         // socket.close();  а надо ли?
//       }

//       sockets[socketName] = socket;
//       break;
//     }
    
//     case "WS_DISCONNECT": {   // свой метод для закрытия соединения
//       const {socketName} = wsAction.payload;

//       if (sockets[socketName]) {
//         sockets[socketName].close();
//         delete sockets[socketName];
//       }

//       break;
//     }
    
//     case "WS_SEND_MESSAGE": {
//       const {socket, message} = wsAction.payload;
//       if (socket.readyState === WebSocket.OPEN) {
//         socket.send(JSON.stringify(message));
//       } else {
//         console.error("[WS]: readyState is false or WebSocket isn't open");
//       }
//     }

//     default:
//       return next(wsAction);
//   }
//   return next(wsAction);
// }