import {diff} from "~@core/diff";
import {cloneNode, debounceFrame, selectAll, simpleDeepEquals} from "~utils";

export const observable = <T>(obj: T) => {
  if (!(obj instanceof Object)) return obj;

  Object.entries(obj).forEach(([key, value]) => {
    let _value = value;
    Object.defineProperty(obj, key, {
      get () {
        return _value;
      },
      set (newValue) {
        if (_value === newValue) return;
        if (JSON.stringify(_value) === JSON.stringify(newValue)) return;
        _value = newValue;
        debounceFrame(_render);
      }
    })
  });
  return obj;
}

interface Container {
  root: HTMLElement | null;
  rootComponent: Function | null;
  isInit: boolean;
  states: any[];
  events: { selector: string, eventType: string, callback: (event: Event) => void }[];
  currentStateKey: number;
  currentEventKey: number;
}

const container: Container = {
  root: null,
  rootComponent: null,
  isInit: false,
  states: [],
  events: [],
  currentStateKey: 0,
  currentEventKey: 0,
}

export const useState = <State>(initState: State): [State, (arg: State) => void] => {
  const { states, currentStateKey } = container;
  states[currentStateKey] = states[currentStateKey] ?? initState;

  const state = states[currentStateKey];

  const setState = (newState: State) => {
    if (simpleDeepEquals(newState, state)) return;
    states[currentStateKey] = newState;
    debounceFrame(_render);
  }

  container.currentStateKey += 1;

  return [state, setState];
}

const _render = () => {
  const { root, rootComponent } = container;
  if (!root || !rootComponent) return;

  container.currentStateKey = 0;
  container.currentEventKey = 0;
  const virtualNode: HTMLElement = cloneNode(root);
  virtualNode.innerHTML = rootComponent();
  diff(root, virtualNode);

  bindEvents();
}

export const render = (
  root: HTMLElement,
  rootComponent: Function
) => {
  container.root = root;
  container.rootComponent = rootComponent;
  container.isInit = true;
  debounceFrame(_render);
}

const bindEvents = () => {
  const { root, events } = container;
  if (!root) return;

  for (const { selector, eventType, callback } of events) {
    selectAll(selector, root).forEach(el => el.addEventListener(eventType, callback))
  }
}

export const addEvent = (
  selector: string,
  eventType: string,
  callback: (event: Event) => void
) => {
  const { root, currentEventKey, events } = container;

  if (root && events[currentEventKey]) {
    const { callback: beforeCallback } = events[currentEventKey];
    selectAll(selector, root).forEach(el => el.removeEventListener(eventType, beforeCallback));
  }

  events[currentEventKey] = { selector, eventType, callback };
  container.currentEventKey += 1;
}