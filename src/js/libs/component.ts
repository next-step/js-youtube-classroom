class Component<
  StateType = unknown,
  PropsType = unknown,
  HanldersType = unknown
> {
  $root: HTMLElement = document.createElement("div");
  $target: HTMLElement = document.createElement("div");

  state: StateType = {} as StateType;
  props: PropsType = {} as PropsType;
  handlers: HanldersType = {} as HanldersType;

  init() {}
  bindEvents() {}
  mount() {}
  mountChildComponent() {}

  updateProps(nextProps: PropsType): void {
    this.props = nextProps;
    this.mount();
  }

  setState(nextState: StateType): void {
    this.state = nextState;
    this.mount();
  }
  render(): void {
    this.init();
    this.mount();
    this.mountChildComponent();
    this.bindEvents();
  }
}

export default Component;
