import Component from "@/libs/component";
import Header from "@/components/Header";
import { AppState, Navigations } from "@/types/index";

class App extends Component {
  $headerComponent: Component | null = null;
  state: AppState;
  constructor($root: Element) {
    super();
    this.$root = $root;
    this.state = {
      filter: "later",
      videoList: [],
    };
  }

  init(): void {
    // videoList 는 웹스토리지에서 가져오기
  }

  setState(nextState: AppState): void {
    this.state = nextState;
    this.$headerComponent &&
      this.$headerComponent.setState({
        filter: this.state.filter,
        onChange: this.handleChangeFilter.bind(this),
      });
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
    this.$headerComponent = new Header(this.$root, {
      filter: this.state.filter,
      onChange: this.handleChangeFilter.bind(this),
    });
    this.$headerComponent.render();
  }

  handleChangeFilter(id: Navigations): void {
    const nextState = { ...this.state, filter: id } as AppState;
    this.setState(nextState);
  }
}

export default App;
