import {Store} from "~_core";

enum MessageType {
  INFO,
  SUCCESS,
  ERROR,
}

interface Message {
  type: MessageType;
  message: string;
}

interface State {
  messages: Message[]
}

const SET_MESSAGES = 'SET_MESSAGES';
const EMIT_MESSAGE = 'EMIT_MESSAGE';

export const messageStore = new Store<State>({

  state: {
    messages: []
  },

  mutations: {
    [SET_MESSAGES] (state: State, messages: Message[]) {
      state.messages = messages;
    }
  },

  actions: {
    [EMIT_MESSAGE] ({ commit, state }, message) {
      commit(SET_MESSAGES, [ ...state.messages, message ]);
    }
  },

});
