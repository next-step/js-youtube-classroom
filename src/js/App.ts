import Component from "@/libs/component";
import Header from "@/components/Header";
import SearchModal from "@/components/SearchModal";
import videoDB from "@/libs/videoDB";
import parseVideoData from "@/utils/parseVideoData";
import { $ } from "@/utils/dom";
import { AppState, Navigations, Item, Filter } from "@/types/index";

class App extends Component {
  $headerComponent: Component | null = null;
  $searchModalComponent: Component | null = null;
  state: AppState;
  constructor($root: Element) {
    super();
    this.$root = $root;
    this.state = {
      filter: "later",
      videoList: videoDB.get(),
      isModalOpen: false,
    };
  }

  setState(nextState: AppState): void {
    this.state = nextState;
    this.$headerComponent &&
      this.$headerComponent.updateProps({
        filter: this.state.filter,
      });
    this.$searchModalComponent &&
      this.$searchModalComponent.updateProps({
        isModalOpen: this.state.isModalOpen,
      });
  }

  mountChildComponent(): void {
    const $header = $("header", this.$root);
    const $modal = $(".modal", this.$root);

    this.$headerComponent = new Header(
      $header,
      {
        filter: this.state.filter,
      },
      { onChange: this.handleChangeFilter.bind(this) }
    );

    this.$searchModalComponent = new SearchModal(
      $modal,
      {
        isModalOpen: this.state.isModalOpen,
        storedDatas: parseVideoData(this.state.videoList),
      },
      { onCloseModal: this.handleCloseModal.bind(this) }
    );

    this.$headerComponent.render();
    this.$searchModalComponent.render();
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

  handleRemoveVideoDB(id: string): void {
    videoDB.remove(id);
    // state 변경
  }

  handleAddVideoDB(data: Item): void {
    videoDB.add({ data, filter: "later", liked: false });
    // state 변경
  }

  handleToggleVideoDB(id: string): void {
    videoDB.toggleLike(id);
    // state 변경
  }

  handleUpdateFilterVideoDB(id: string, filter: Filter): void {
    videoDB.updateFilter(id, filter);
    // state 변경
  }
}

export default App;
