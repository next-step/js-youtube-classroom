interface Container {
  root: HTMLElement | null;
  rootComponent: Function | null;
  isInit: boolean;
}

const allStates: any = [];

const container: Container = {
  root: null,
  rootComponent: null,
  isInit: false,
}

let currentStateKey = 0;

export const useState = <State>(state: State) => {
  const key = currentStateKey;
  allStates[key] = state;
  const setState = (newState: State) => {
    allStates[key] = newState;
    _render();
  }

  currentStateKey += 1;

  return [state, setState];
}

export const _render = () => {
  const { root, rootComponent } = container;
  root!.innerHTML = rootComponent!();
}

export const render = (
  root: HTMLElement,
  rootComponent: Function
) => {
  currentStateKey = 0;
  if (!container.isInit) {
    container.root = root;
    container.rootComponent = rootComponent;
    container.isInit = true;
  }
  _render();
}
