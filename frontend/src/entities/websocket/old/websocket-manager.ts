import { store } from "../../../app/Store/store";
// import { callbackListener } from "../types";

class WebSocketManager {
  private socket: WebSocket | null = null;
  private adress: string;
  // private subscribers: callbackListener[] = [];

  constructor(adress: string) {
    this.adress = adress;
  }

  connect() {
    this.socket = new WebSocket(this.adress);

    this.socket.onopen = () => {
      console.log("[WS]: Connection has been successfully established");
    }

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        console.log("[WS]: Recieved message:", data);
        
        // this.subscribers.forEach(cb => cb(data));
      } catch (err) {
        console.error("[WS]: Parsing json error:", err);
      }
    }

    this.socket.onclose = () => {
      console.log("[WS]: Connection closed");
    }

    this.socket.onerror = (error) => {
      console.error("[WS]: Websocket error:", error);
    }
  }

  onMessage(callback: (data: any) => void) {
    // this.subscribers.push(callback);
  }

  offMessage(callback: (data: any) => void) {
    // this.subscribers = this.subscribers.filter(func => func !== callback);
  }

  sendMessage(message: any) {   // требуется типизация, когда будут обозначена программа общения с бекендом
    if (this.socket?.readyState === WebSocket.OPEN) {
      this.socket.send(JSON.stringify(message));
    }
  }

  disconnect() {
    this.socket?.close();
  }
}

export default WebSocketManager;