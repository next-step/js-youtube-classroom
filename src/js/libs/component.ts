class Component {
  $root: Element = document.createElement("div");
  $target: Element = document.createElement("div");
  state: unknown;
  props: unknown;
  init() {}
  bindEvents() {}
  mount() {}
  mountChildComponent() {}

  updateProps(nextProps: unknown) {
    this.props = nextProps;
    this.mount();
  }

  setState(nextState: unknown) {
    this.state = nextState;
    this.mount();
  }
  render() {
    this.init();
    this.mount();
    this.mountChildComponent();
    this.bindEvents();
  }
}

export default Component;
