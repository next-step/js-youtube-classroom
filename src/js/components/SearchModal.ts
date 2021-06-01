import Component from "@/libs/component";
import { $ } from "@/utils/dom";
import {
  SearchModalProps,
  SearchModalHandlers,
  SearchModalState,
  SaveButton,
  VideoCacheValue,
  Item,
} from "@/types/index";
import {
  MODAL_SELECTORS,
  SEARCH_SELECTORS,
  CLASS_NAMES,
} from "@/constants/index";

import SearchBar from "@/components/SearchBar";
import SearchHistory from "@/components/SearchHistory";
import SearchResult from "@/components/SearchResult";
import StoredVideoCounter from "@/components/StoredVideoCounter";

import cache from "@/libs/cache";
import searchHistoryDB from "@/libs/searchHistoryDB";
import intersectionObserver from "@/utils/intersectionObserver";
import popUpSnackBar from "@/utils/popUpSnackBar";
import getAPI from "@/api/index";

const videoCache = new cache<VideoCacheValue>();

class SearchModal extends Component {
  props: SearchModalProps;
  handlers: SearchModalHandlers;
  state: SearchModalState;

  $searchBarComponent: Component | null = null;
  $searchHistoryComponent: Component | null = null;
  $searchResultComponent: Component | null = null;
  $storedVideoCounterComponent: Component | null = null;

  constructor(
    $root: HTMLElement,
    props: SearchModalProps,
    handlers: SearchModalHandlers
  ) {
    super();
    this.$root = $root;
    this.props = props;
    this.handlers = handlers;
    this.state = {
      datas: [],
      searchKeyword: "",
      searchHistory: searchHistoryDB.get(),
      isLoading: false,
      lastKey: "",
      hasMore: true,
    };
  }

  init(): void {
    this.$target = $(MODAL_SELECTORS.INNER, this.$root);
  }

  bindEvents(): void {
    $(MODAL_SELECTORS.CLOSE, this.$target).addEventListener(
      "click",
      this.handlers.onCloseModal
    );
    this.$root.addEventListener("click", (e: Event) => {
      const target = e.target as HTMLElement;
      target.classList.contains(CLASS_NAMES.MODAL_OPEN) &&
        this.handlers.onCloseModal();
    });
    intersectionObserver(
      this.$root,
      $(MODAL_SELECTORS.OBSERVER),
      this.getMoreVideos.bind(this)
    );
  }

  updateProps(nextProps: SearchModalProps): void {
    this.props = nextProps;
    this.props.isModalOpen
      ? this.$root.classList.add(CLASS_NAMES.MODAL_OPEN)
      : this.$root.classList.remove(CLASS_NAMES.MODAL_OPEN);
    this.$storedVideoCounterComponent?.updateProps({
      storedVideoCount: this.props.storedDatas.size,
    });
  }

  setState(nextState: SearchModalState): void {
    this.state = nextState;
    this.$searchHistoryComponent?.updateProps({
      histories: this.state.searchHistory,
    });
    this.$searchResultComponent?.updateProps({
      datas: this.state.datas,
      storedDatas: this.props.storedDatas,
      isLoading: this.state.isLoading,
      hasMore: this.state.hasMore,
    });
    this.$storedVideoCounterComponent?.updateProps({
      storedVideoCount: this.props.storedDatas.size,
    });
  }

  mountChildComponent(): void {
    const $searchBar = $(SEARCH_SELECTORS.SEARCH_BAR, this.$root);
    const $searchHistory = $(SEARCH_SELECTORS.SEARCH_HISTORY, this.$root);
    const $searchResult = $(SEARCH_SELECTORS.SEARCH_RESULT, this.$root);
    const $storedVideoCounter = $(SEARCH_SELECTORS.SEARCH_COUNTER, this.$root);

    this.$searchBarComponent = new SearchBar($searchBar, {
      onSubmitSearch: this.handleSearch.bind(this),
    });
    this.$searchHistoryComponent = new SearchHistory(
      $searchHistory,
      {
        histories: this.state.searchHistory,
      },
      { onClickHistory: this.handleSearch.bind(this) }
    );
    this.$searchResultComponent = new SearchResult(
      $searchResult,
      {
        datas: this.state.datas,
        isLoading: this.state.isLoading,
        storedDatas: this.props.storedDatas,
        hasMore: this.state.hasMore,
      },
      {
        onClickButton: this.handleSaveVideo.bind(this),
      }
    );
    this.$storedVideoCounterComponent = new StoredVideoCounter(
      $storedVideoCounter,
      { storedVideoCount: this.props.storedDatas.size }
    );

    this.$searchHistoryComponent.render();
    this.$searchBarComponent.render();
    this.$searchResultComponent.render();
    this.$storedVideoCounterComponent.render();
  }

  getMoreVideos(): void {
    this.state.searchKeyword && this.getVideos(this.state.searchKeyword);
  }

  initState(
    keyword: string,
    datas: Item[] = [],
    lastKey: string = "",
    hasMore: boolean = true
  ): void {
    let filteredHistory = this.state.searchHistory.filter(
      (history) => history !== keyword
    );
    if (filteredHistory.length === 3)
      filteredHistory = filteredHistory.slice(0, 2);
    const updatedHistory = [...new Set([keyword, ...filteredHistory])];
    const nextState = {
      ...this.state,
      datas,
      searchKeyword: keyword,
      searchHistory: updatedHistory,
      lastKey,
      isLoading: true,
      hasMore,
    };
    searchHistoryDB.set(updatedHistory);
    this.setState(nextState);
  }

  async getVideos(keyword: string): Promise<void> {
    try {
      if (!this.state.hasMore) return;
      const response = await getAPI(keyword, this.state.lastKey);
      if (!response) return;
      const { datas, lastKey, size } = response;
      const updatedData = [...this.state.datas, ...datas];
      const hasMore = updatedData.length < size;

      videoCache.set(keyword, { datas: updatedData, lastKey, hasMore });
      const nextState = {
        ...this.state,
        isLoading: false,
        datas: updatedData,
        lastKey,
        hasMore,
      };
      this.setState(nextState);
      return;
    } catch (error) {
      popUpSnackBar(error);
    }
  }

  handleSearch(value: string): void {
    if (value === this.state.searchKeyword || !value) return;
    if (videoCache.has(value)) {
      const { datas, hasMore, lastKey } = videoCache.get(value);
      this.initState(value, datas, lastKey, hasMore);
    } else {
      this.initState(value);
      this.getVideos(value);
    }
  }

  handleSaveVideo(id: string, type: SaveButton): void {
    const assginAction = {
      save: () => {
        const video = this.state.datas.find((item) => item.id === id);
        if (!video) return;
        this.handlers.onSaveVideo(video);
      },
      unsave: () => {
        this.handlers.onRemoveVideo(id);
      },
    };
    assginAction[type]();
  }
}

export default SearchModal;
