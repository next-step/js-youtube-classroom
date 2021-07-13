import {diff} from "~@core/diff";
import {cloneNode, debounceFrame, simpleDeepEquals} from "~utils";

interface Container {
  root: HTMLElement | null;
  rootComponent: Function | null;
  isInit: boolean;
  currentStateKey: number;
  states: any[];
}

const container: Container = {
  root: null,
  rootComponent: null,
  isInit: false,
  currentStateKey: 0,
  states: [],
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

export const _render = () => {
  const { root, rootComponent } = container;
  if (!root || !rootComponent) return;

  container.currentStateKey = 0;
  const virtualNode: HTMLElement = cloneNode(root);
  virtualNode.innerHTML = rootComponent();
  diff(root, virtualNode);
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
  _render();
}
