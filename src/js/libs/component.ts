class Component {
  $root: Element | null = null;
  $target: Element | null = null;
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
