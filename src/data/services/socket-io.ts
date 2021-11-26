import { Socket, io } from "socket.io-client";

export default abstract class SocketIO {
  static connectServer(url: string): Socket {
    const socket: Socket = io(url);
    socket.on("disconnect", () => {
      socket.removeAllListeners();
    });
    return socket;
  }

  static addListener(
    socket: Socket,
    channel: string,
    // eslint-disable-next-line
    callback: (message: string | number | boolean | Record<string, any>) => any
  ): void {
    socket.on(channel, callback);
  }

  static removeAllListeners(socket: Socket, channel?: string): void {
    socket.removeAllListeners(channel);
  }

  static emitMessage(
    socket: Socket,
    channel: string,
    // eslint-disable-next-line
    message: string | number | boolean | Record<string, any>
  ): void {
    socket.emit(channel, message);
  }

  static disconnect(socket: Socket): void {
    socket.disconnect();
  }
}
