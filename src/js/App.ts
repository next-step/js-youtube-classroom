import Component from "@/libs/component";
class App extends Component {
  constructor($root: Element) {
    super();
    this.$root = $root;
  }

  mount(): void {
    const $container = document.createElement("div");
    $container.className = "d-flex justify-center mt-5 w-100";
    this.$target = document.createElement("div");
    this.$target.className = "w-100";

    $container.appendChild(this.$target);
    this.$root?.appendChild($container);
    return;
  }

  init() {
    this.mount();
  }
}

export default App;
