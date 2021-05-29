class Component {
  $root: Element = document.createElement("div");
  $target: Element = document.createElement("div");
  init() {}
  bindEvents() {}
  mount() {}
  mountChildComponent() {}
  setState() {}

  render() {
    this.init();
    this.mount();
    this.mountChildComponent();
    this.bindEvents();
  }
}

export default Component;
