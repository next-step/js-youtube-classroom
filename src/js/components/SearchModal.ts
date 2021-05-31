import Component from "@/libs/component";
import { $ } from "@/utils/dom";
import {
  SearchModalProps,
  SearchModalHandlers,
  SearchModalState,
} from "@/types/index";

import SearchBar from "@/components/SearchBar";
import SearchHistory from "@/components/SearchHistory";
import SearchResult from "@/components/SearchResult";
import StoredVideoCounter from "@/components/StoredVideoCounter";

import searchHistoryDB from "@/libs/searchHistoryDB";
import intersectionObserver from "@/utils/intersectionObserver";
import getAPI from "@/api/index";

class SearchModal extends Component {
  props: SearchModalProps;
  handlers: SearchModalHandlers;
  state: SearchModalState;

  $searchBarComponent: Component | null = null;
  $searchHistoryComponent: Component | null = null;
  $searchResultComponent: Component | null = null;
  $storedVideoCounterComponent: Component | null = null;

  constructor(
    $root: Element,
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

  init() {
    this.$target = $(".modal-inner", this.$root);
  }

  bindEvents() {
    $(".modal-close", this.$target).addEventListener(
      "click",
      this.handlers.onCloseModal
    );
    this.$root.addEventListener("click", (e: Event) => {
      const target = e.target as Element;
      target.className === "modal open" && this.handlers.onCloseModal();
    });
    intersectionObserver(
      this.$root,
      $(".observer"),
      this.getMoreVideos.bind(this)
    );
  }

  updateProps(nextProps: SearchModalProps) {
    this.props = nextProps;
    this.props.isModalOpen
      ? this.$root.classList.add("open")
      : this.$root.classList.remove("open");
  }

  setState(nextState: SearchModalState) {
    this.state = nextState;
    this.$searchHistoryComponent &&
      this.$searchHistoryComponent.updateProps({
        histories: this.state.searchHistory,
      });
    this.$searchResultComponent &&
      this.$searchResultComponent.updateProps({
        datas: this.state.datas,
        isLoading: this.state.isLoading,
        hasMore: this.state.hasMore,
      });
  }

  mountChildComponent() {
    const $searchBar = $("#search-form", this.$root);
    const $searchHistory = $("#search-history", this.$root);
    const $searchResult = $("#search-result", this.$root);
    const $storedVideoCounter = $("#stored-counter", this.$root);

    this.$searchBarComponent = new SearchBar($searchBar, {
      onSubmitSearch: this.handleSubmitSearch.bind(this),
    });
    this.$searchHistoryComponent = new SearchHistory(
      $searchHistory,
      {
        histories: this.state.searchHistory,
      },
      { onClickHistory: this.handleClickHistory.bind(this) }
    );
    this.$searchResultComponent = new SearchResult($searchResult, {
      datas: this.state.datas,
      isLoading: this.state.isLoading,
      hasMore: this.state.hasMore,
    });
    this.$storedVideoCounterComponent = new StoredVideoCounter(
      $storedVideoCounter,
      { storedVideoCount: this.props.storedDatas.length }
    );

    this.$searchHistoryComponent.render();
    this.$searchBarComponent.render();
    this.$searchResultComponent.render();
    this.$storedVideoCounterComponent.render();
  }

  handleSubmitSearch(e: Event) {
    e.preventDefault();
    const $target = e.target as Element;
    const $input = $("input", $target) as HTMLInputElement;
    if (!$target || !$input) return;
    const value = $input.value;
    searchHistoryDB.set(value);
    this.initState(value);
    return this.getVideos(value);
  }

  handleClickHistory(value: string) {
    if (value === this.state.searchKeyword) return;
    this.initState(value);
    return this.getVideos(value);
  }

  getMoreVideos() {
    return this.state.searchKeyword && this.getVideos(this.state.searchKeyword);
  }

  initState(keyword: string) {
    const nextState = {
      ...this.state,
      searchKeyword: keyword,
      searchHistory: [
        ...new Set([keyword, ...this.state.searchHistory.slice(0, 2)]),
      ],
      lastKey: "",
      isLoading: true,
      hasMore: true,
    };
    this.setState(nextState);
  }

  async getVideos(keyword: string) {
    try {
      if (!this.state.hasMore) return;
      const response = await getAPI(keyword, this.state.lastKey);
      if (!response) return;
      const { datas, lastKey, size } = response;
      const updatedData = this.state.lastKey
        ? [...this.state.datas, ...datas]
        : datas;

      const nextState = {
        ...this.state,
        isLoading: false,
        datas: updatedData,
        lastKey,
        hasMore: updatedData.length < size,
      };
      return this.setState(nextState);
    } catch (error) {
      // 추후 Alert 띄워주기
    }
  }
}

export default SearchModal;
