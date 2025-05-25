import { MessageForGeneration } from "@/features/UserTopics/types/topic";

class Socket {
  public socket: WebSocket | null;
  public readyState = 0;

  constructor() {
    this.socket = null;
  }

  on(eventName: string, callback: (e: any) => void) {
    if (this.socket) {
      this.socket.addEventListener(eventName, callback);
    }
  }

  connect(url: string, payload: (MessageForGeneration & {token: string}) | null) {
    if (!this.socket) {
      if (!payload) this.socket = new WebSocket(url);
      else {
        console.log(payload.text);
        
        this.socket = new WebSocket(
        url +
        new URLSearchParams({
          token: payload.token,
          lang: payload.lang,
          user_prompt: payload.user_prompt ? payload.user_prompt : "",
          fullness: payload.fullness.toString(),
          topic: payload.topic ? payload.topic : "",
          text: payload.text
        }))
      }
      this.socket.binaryType = 'arraybuffer';
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close()
      this.socket = null;
    }
  }

  send(message: any) {
    if (this.socket) {
      this.socket.send(message);
    }
  }
}

export default Socket;