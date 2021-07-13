import {diff} from "~@core/diff";
import {cloneNode, debounceFrame, selectAll, simpleDeepEquals} from "~utils";

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
  registerEvents();
}

export const render = (
  root: HTMLElement,
  rootComponent: Function
) => {
  if (!container.isInit) {
    container.root = root;
    container.rootComponent = rootComponent;
    container.isInit = true;
  }
  debounceFrame(_render);
}

export const addEvent = (
  selector: string,
  eventType: string,
  callback: (event: Event) => void
) => {
  const { currentEventKey, events } = container;
  if (events[currentEventKey] !== undefined) return;
  events[currentEventKey] = { selector, eventType, callback };
  container.currentEventKey += 1;
}

export const registerEvents = () => {
  const { root, events } = container;
  if (!root) return;

  for (const { selector, eventType, callback } of events) {
    selectAll(selector, root).forEach(el => {
      el.removeEventListener(eventType, callback);
      el.addEventListener(eventType, callback);
    })
  }
}