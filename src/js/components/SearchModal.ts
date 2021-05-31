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
      searchKewyord: "",
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
        storedVideoCount: 1,
        isLoading: this.state.isLoading,
      });
  }

  mountChildComponent() {
    const $searchBar = $("#search-form", this.$root);
    const $searchHistory = $("#search-history", this.$root);
    const $searchResult = $("#search-result", this.$root);

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
      datas: [],
      isLoading: false,
    });

    this.$searchHistoryComponent.render();
    this.$searchBarComponent.render();
    this.$searchResultComponent.render();
  }

  handleSubmitSearch(e: Event) {
    e.preventDefault();
    const $target = e.target as Element;
    const $input = $("input", $target) as HTMLInputElement;
    if (!$target || !$input) return;
    const value = $input.value;
    searchHistoryDB.set(value);
    const nextState = {
      ...this.state,
      searchKeyword: value,
      searchHistory: [value, ...this.state.searchHistory.slice(0, 2)],
      lastKey: "",
      hasMore: true,
    };
    this.setState(nextState);
    return this.getVideos(value);
  }

  handleClickHistory(value: string) {
    if (value === this.state.searchKewyord) return;
    return this.getVideos(value);
  }

  getMoreVideos() {
    return this.state.searchKewyord && this.getVideos(this.state.searchKewyord);
  }

  async getVideos(keyword: string) {
    try {
      if (!this.state.hasMore) return;
      this.setState({ ...this.state, isLoading: true });
      const response = await getAPI(keyword, this.state.lastKey);
      if (!response) return;
      const { datas, lastKey, size } = response;
      console.log(datas);
      const updatedData = [...this.state.datas, ...datas];
      const nextState = {
        ...this.state,
        isLoading: false,
        datas: updatedData,
        lastKey,
        hasMore: updatedData.length < size,
      } as SearchModalState;
      return this.setState(nextState);
    } catch (error) {
      // 추후 Alert 띄워주기
    }
  }
}

export default SearchModal;
