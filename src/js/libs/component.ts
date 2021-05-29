class Component {
  $root: Element | null = null;
  $target: Element | null = null;
  init() {}
  mount() {}
  mountChildComponent() {}
  render() {}
  setState() {
    this.render();
  }
}

export default Component;
