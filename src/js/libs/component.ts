class Component {
  $root: HTMLElement = document.createElement("div");
  $target: HTMLElement = document.createElement("div");
  state: unknown;
  props: unknown;
  handlers: unknown;

  init() {}
  bindEvents() {}
  mount() {}
  mountChildComponent() {}

  updateProps(nextProps: unknown): void {
    this.props = nextProps;
    this.mount();
  }

  setState(nextState: unknown): void {
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
