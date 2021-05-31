import Component from "@/libs/component";
import Header from "@/components/Header";
import SearchModal from "@/components/SearchModal";
import videoDB from "@/libs/videoDB";
import parseVideoData from "@/utils/parseVideoData";
import { $ } from "@/utils/dom";
import { AppState, Navigations, Item, Filter } from "@/types/index";
import { APP_SELECTORS, FILTER_ID, SEARCH_BUTTON_ID } from "@/constants/index";

class App extends Component {
  $headerComponent: Component | null = null;
  $searchModalComponent: Component | null = null;
  state: AppState;
  constructor($root: HTMLElement) {
    super();
    this.$root = $root;
    this.state = {
      filter: FILTER_ID.later,
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
        storedDatas: parseVideoData(this.state.videoList),
      });
  }

  mountChildComponent(): void {
    const $header = $(APP_SELECTORS.HEADER, this.$root);
    const $modal = $(APP_SELECTORS.MODAL, this.$root);

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
      {
        onCloseModal: this.handleCloseModal.bind(this),
        onSaveVideo: this.handleAddVideoDB.bind(this),
        onRemoveVideo: this.handleRemoveVideoDB.bind(this),
      }
    );

    this.$headerComponent.render();
    this.$searchModalComponent.render();
  }

  handleChangeFilter(id: Navigations): void {
    const nextState =
      id === SEARCH_BUTTON_ID
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
    this.setState({ ...this.state, videoList: videoDB.get() });
  }

  handleAddVideoDB(data: Item): void {
    videoDB.add({ data, filter: FILTER_ID.later, liked: false });
    this.setState({ ...this.state, videoList: videoDB.get() });
  }

  handleToggleVideoDB(id: string): void {
    videoDB.toggleLike(id);
    this.setState({ ...this.state, videoList: videoDB.get() });
  }

  handleUpdateFilterVideoDB(id: string, filter: Filter): void {
    videoDB.updateFilter(id, filter);
    this.setState({ ...this.state, videoList: videoDB.get() });
  }
}

export default App;
