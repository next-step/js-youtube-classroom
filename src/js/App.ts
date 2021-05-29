import Component from "@/libs/component";
import Header from "@/components/Header";

class App extends Component {
  $headerComponent: Component | null = null;
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

  mountChildComponent(): void {
    if (!this.$root) return;
    this.$headerComponent = new Header(this.$root);
    this.$headerComponent.render();
  }
}

export default App;
