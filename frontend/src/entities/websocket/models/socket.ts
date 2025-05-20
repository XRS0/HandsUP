class Socket {
  public socket: WebSocket | null;

  constructor() {
    this.socket = null;
  }

  on(eventName: string, callback: (e: any) => void) {
    if (this.socket) {
      this.socket.addEventListener(eventName, callback);
    }
  }

  connect(url: string) {
    if (!this.socket) {
      this.socket = new WebSocket(url);
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
      this.socket.send(JSON.stringify(message));
    }
  }
}

export default Socket;