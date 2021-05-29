class Component {
  $root: Element = document.createElement("div");
  $target: Element = document.createElement("div");
  init() {}
  bindEvents() {}
  mount() {}
  mountChildComponent() {}

  setState() {
    this.render();
  }

  render() {
    this.init();
    this.mount();
    this.mountChildComponent();
    this.bindEvents();
  }
}

export default Component;
