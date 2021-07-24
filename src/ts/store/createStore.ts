import { Action, Reducer, Store } from '../types';

const createStore = (reducer: Reducer): Store => {
  let listeners: Function[] = [];

  let state = Object.freeze(reducer());

  const subscribe = (newListener: Function) => {
    listeners.push(newListener);

    return () => {
      listeners = listeners.filter(listener => listener !== newListener);
    };
  };

  const invokeListeners = () => {
    listeners.forEach(listener => listener());
  };

  const dispatch = (action: Action) => {
    const newState = reducer(state, action);

    if (!newState) throw new Error('리듀서 함수는 항상 상태값을 반환해야합니다.');

    if (state === newState) return;

    state = Object.freeze(newState);

    invokeListeners();
  };

  return {
    subscribe,
    dispatch,
    getState: () => state,
  };
};

export default createStore;
