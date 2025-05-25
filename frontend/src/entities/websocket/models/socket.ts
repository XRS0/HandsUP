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

  connect(url: string) {
    if (!this.socket) {
      this.socket = new WebSocket(url);
      this.socket.binaryType = 'arraybuffer';
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close()
      console.log("connection is closed");
      this.socket = null;
    }
  }

  send(message: ArrayBuffer) {
    if (this.socket) {
      this.socket.send(message);
    }
  }
}

export default Socket;