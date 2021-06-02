import Component from "@/libs/component";
import Header from "@/components/Header";
import SearchModal from "@/components/SearchModal";
import ClassRoom from "@/components/ClassRoom";
import videoDB from "@/libs/videoDB";
import parseVideoData from "@/utils/parseVideoData";
import popUpSnackBar from "@/utils/popUpSnackBar";
import { $ } from "@/utils/dom";
import { AppState, Navigations, Item } from "@/types/index";
import {
  APP_SELECTORS,
  FILTER_ID,
  SEARCH_BUTTON_ID,
  TOAST_MESSAGES,
} from "@/constants/index";

class App extends Component<AppState> {
  $headerComponent: Component | null = null;
  $searchModalComponent: Component | null = null;
  $classRoomComponent: Component | null = null;

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
    this.$headerComponent?.updateProps({
      filter: this.state.filter,
    });
    this.$searchModalComponent?.updateProps({
      isModalOpen: this.state.isModalOpen,
      storedDatas: parseVideoData(this.state.videoList),
    });
    this.$classRoomComponent?.updateProps({
      filter: this.state.filter,
      videoList: this.state.videoList,
    });
  }

  mountChildComponent(): void {
    const $header = $(APP_SELECTORS.HEADER, this.$root);
    const $modal = $(APP_SELECTORS.MODAL, this.$root);
    const $classRoom = $(APP_SELECTORS.CLASS_ROOM, this.$root);

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

    this.$classRoomComponent = new ClassRoom(
      $classRoom,
      {
        filter: this.state.filter,
        videoList: this.state.videoList,
      },
      {
        onToggleWatch: this.hanldeToggleWatchVideoDB.bind(this),
        onToggleLike: this.handleToggleLikeVideoDB.bind(this),
        onRemoveVideo: this.handleRemoveVideoDB.bind(this),
      }
    );

    this.$headerComponent.render();
    this.$searchModalComponent.render();
    this.$classRoomComponent.render();
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
    const nextVideoList = videoDB.remove(id);
    popUpSnackBar(TOAST_MESSAGES.REMOVE);
    this.setState({ ...this.state, videoList: nextVideoList });
  }

  handleAddVideoDB(data: Item): void {
    const nextVideoList = videoDB.add({
      data,
      liked: false,
      watched: false,
    });
    popUpSnackBar(TOAST_MESSAGES.SAVE);
    this.setState({ ...this.state, videoList: nextVideoList });
  }

  handleToggleLikeVideoDB(id: string): void {
    const nextVideoList = videoDB.toggleLike(id);
    if (nextVideoList.find((video) => video.data.id === id)?.liked) {
      popUpSnackBar(TOAST_MESSAGES.LIKE);
    } else {
      popUpSnackBar(TOAST_MESSAGES.UNLIKE);
    }
    this.setState({ ...this.state, videoList: nextVideoList });
  }

  hanldeToggleWatchVideoDB(id: string): void {
    const nextVideoList = videoDB.toggleWatch(id);
    if (nextVideoList.find((video) => video.data.id === id)?.watched) {
      popUpSnackBar(TOAST_MESSAGES.WATCHED);
    } else {
      popUpSnackBar(TOAST_MESSAGES.LATER);
    }
    this.setState({ ...this.state, videoList: nextVideoList });
  }
}

export default App;
