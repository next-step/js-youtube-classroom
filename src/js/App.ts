import Component from "@/libs/component";
import Header from "@/components/Header";
import SearchModal from "@/components/SearchModal";
import { $ } from "@/utils/dom";
import { AppState, Navigations } from "@/types/index";

class App extends Component {
  $headerComponent: Component | null = null;
  $searchModalComponent: Component | null = null;
  state: AppState;
  constructor($root: Element) {
    super();
    this.$root = $root;
    this.state = {
      filter: "later",
      videoList: [],
      isModalOpen: false,
    };
  }

  init(): void {
    // videoList 는 웹스토리지에서 가져오기
  }

  setState(nextState: AppState): void {
    this.state = nextState;
    this.$headerComponent &&
      this.$headerComponent.updateProps({
        filter: this.state.filter,
        onChange: this.handleChangeFilter.bind(this),
      });
    this.$searchModalComponent &&
      this.$searchModalComponent.updateProps({
        isModalOpen: this.state.isModalOpen,
        onCloseModal: this.handleCloseModal.bind(this),
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
    const $modalRoot = $(".modal");
    if ($modalRoot) {
      this.$searchModalComponent = new SearchModal($modalRoot, {
        isModalOpen: this.state.isModalOpen,
        onCloseModal: this.handleCloseModal.bind(this),
      });
      this.$searchModalComponent.render();
    }
  }

  handleChangeFilter(id: Navigations): void {
    const nextState =
      id === "search-button"
        ? { ...this.state, isModalOpen: true }
        : ({ ...this.state, filter: id } as AppState);
    this.setState(nextState);
  }

  handleCloseModal(): void {
    const nextState = {
      ...this.state,
      isModalOpen: false,
    } as AppState;
    this.setState(nextState);
  }
}

export default App;
