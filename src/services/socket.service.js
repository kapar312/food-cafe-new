import {GP_SESSION} from "../consts/auth.const";
import {getStorage} from "../services/storage.service";

class PointSocket {
  constructor() {
    if (getStorage(GP_SESSION)) {
      this.createConnection();
    }
  }

  eventTypes = {
    CLOSE: "close",
    OPEN: "open",
    MESSAGE: "message",
  };

  options = {
    protocol: process.env.SOCKET_PROTOCOL || "ws",
    address: process.env.SOCKET_ADDRESS || "test.guardpoint.ru:8090",
  };

  listeners = {};

  reconnectTimeoutInstance = null;

  /**
   * Variable that stores WebSocket instance
   * @type {WebSocket|null}
   */
  _socket = null;

  createConnection = () => {
    if (this._socket !== null) {
      this._socket.removeEventListener("error", this.handleSocketClose);
      this._socket.removeEventListener("close", this.handleSocketClose);
      this._socket.removeEventListener("open", this.handleSocketOpen);
      this._socket.removeEventListener("message", this.handleSocketMessage);
      // this._socket.removeEventListener("message", this.getMessages);
      this._socket.close();
      this._socket = null;
    }

    this._socket = new WebSocket(this.url);

    this._socket.addEventListener("error", this.handleSocketClose);
    this._socket.addEventListener("close", this.handleSocketClose);
    this._socket.addEventListener("open", this.handleSocketOpen);
    this._socket.addEventListener("message", this.handleSocketMessage);
    // this._socket.removeEventListener("message", this.getMessages);
  };

  handleSocketClose = (event) => {
    const {type} = event;

    if (type === "error") {
      // eslint-disable-next-line no-console
      console.error("PointSocket error");
    }

    if (
      this._socket.readyState === WebSocket.CLOSING ||
      this._socket.readyState === WebSocket.CLOSED
    ) {
      this.reconnectTimeoutInstance = setTimeout(() => {
        this.createConnection();
      }, 3000);
    }
  };

  handleSocketOpen = () => {
    // console.log("PointSocket onOpen =>", event);
    if (this.reconnectTimeoutInstance !== null) {
      clearTimeout(this.reconnectTimeoutInstance);
      this.reconnectTimeoutInstance = null;
    }
  };

  handleSocketMessage = (event) => {
    const {data} = event;
    let validated = null;

    try {
      validated = JSON.parse(data);
      // return validated;
    } catch (e) {
      // console.error("Couldn't parse websocket message! =>", e);
      return;
    }

    if (this.hasListener(this.eventTypes.MESSAGE)) {
      this.listeners[this.eventTypes.MESSAGE].forEach((handler) => {
        handler(validated);
      });
    }
  };

  get url() {
    const token = getStorage(GP_SESSION);
    return [
      `${this.options.protocol}://${this.options.address}`,
      token && `?gp-session=${token}`,
    ]
      .filter(Boolean)
      .join("");
  }

  get connection() {
    if (
      this._socket === null ||
      this._socket.readyState === WebSocket.CLOSING ||
      this._socket.readyState === WebSocket.CLOSED
    ) {
      this.createConnection();
    }
    return this._socket;
  }

  on = (event, handler) => {
    if (!event || !handler) return;

    if (
      Object.keys(this.listeners).includes(event) &&
      Array.isArray(this.listeners[event])
    ) {
      if (!this.listeners[event].some((item) => item.toString() === handler.toString())) {
        this.listeners[event].push(handler);
      }
    } else {
      this.listeners[event] = [handler];
    }
  };

  off = (event, handler) => {
    if (!event || !handler) return;

    if (this.hasListener(event)) {
      this.listeners[event] = this.listeners[event].filter(
        (item) => item.toString() !== handler.toString()
      );
    }
  };

  hasListener = (event) =>
    Object.keys(this.listeners).includes(event) &&
    Array.isArray(this.listeners[event]) &&
    this.listeners[event].length;

  invokeMethod = (method, data) => {
    const message = JSON.stringify({
      method,
      data: typeof data === "object" ? JSON.stringify(data) : data.toString(),
    });

    // console.log("PointSocket sending message... =>", message);

    if (this.connection.readyState === WebSocket.OPEN) {
      this.connection.send(message);
    } else {
      // TODO: Need message queue manager
      //  if message sent failed the queue manager should resend the message
    }
    return;
  };
}

export default new PointSocket();
