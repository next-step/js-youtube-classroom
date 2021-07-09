import { Action, GlobalState, Reducer, Store } from '../types';

const GLOBAL_STATE = 'globalState';

// 라이브러리로써 사용한다면 reducer파일에 있는게 맞지만 현재는 제가 만들어쓰는 한정된 함수로써 취급하였습니다.
let INITIAL_STATE: GlobalState = JSON.parse(window.localStorage.getItem(GLOBAL_STATE)) ?? {
  isSearchLoading: false,
  error: null,
  searchList: [],
  recentSearchList: [],
};

const createStore = (reducer: Reducer): Store => {
  let listeners: Function[] = [];

  let state = Object.freeze(reducer(INITIAL_STATE, { type: null }));

  const subscribe = (newListener: Function) => {
    listeners.push(newListener);

    return () => {
      listeners = listeners.filter(listener => listener !== newListener);
    };
  };

  const invokeListeners = () => {
    listeners.forEach(listener => listener(state));
  };

  const dispatch = (action: Action) => {
    const newState = reducer(state, action);

    if (!newState) throw new Error('리듀서 함수는 항상 상태값을 반환해야합니다.');

    if (state === newState) return;

    state = Object.freeze(newState);
    // 전역상태를 localstorage영역에서 저장해두고 사용할것임 persist를 흉내내고 싶은...
    window.localStorage.setItem(GLOBAL_STATE, JSON.stringify(state));

    invokeListeners();
  };

  return {
    subscribe,
    dispatch,
    getState: callback => callback(state),
  };
};

export default createStore;
