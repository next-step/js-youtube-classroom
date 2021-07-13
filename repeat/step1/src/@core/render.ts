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

export const useState = <State>(state: State): [State, (arg: State) => void] => {
  const { states, currentStateKey } = container;

  states[currentStateKey] = states[currentStateKey] ?? state;
  const setState = (newState: State) => {
    states[currentStateKey] = newState;
    _render();
  }

  container.currentStateKey += 1;

  return [states[currentStateKey], setState];
}

export const _render = () => {
  const { root, rootComponent } = container;
  container.currentStateKey = 0;
  root!.innerHTML = rootComponent!();
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
