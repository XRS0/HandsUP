class Socket {
  public socket: WebSocket | null;
  public readyState: number | null;

  constructor() {
    this.socket = null;
    this.readyState = null;
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
      this.readyState = this.socket.readyState;
    }
  }

  disconnect() {
    if (this.socket) {
      this.socket.close()
      this.readyState = this.socket.readyState;
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