import { createStore } from "vuex";
import { Socket } from "socket.io-client";

export default createStore({
  state: {
    socket: undefined as unknown as Socket,
  },
  getters: {
    socketServer(state) {
      return state.socket;
    },
  },
  mutations: {
    updateSocket(state, socket: Socket): void {
      state.socket = socket;
    },
  },
  actions: {
    setSocket(context, socket: Socket): void {
      context.commit("updateSocket", socket);
    },
  },
  modules: {},
});
