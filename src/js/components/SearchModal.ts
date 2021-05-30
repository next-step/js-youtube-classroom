import Component from "@/libs/component";
import { $ } from "@/utils/dom";
import { SearchModalProps, SearchModalState } from "@/types/index";
import template from "@/templates/SearchModal";
import SearchBar from "@/components/SearchBar";
import SearchHistory from "@/components/SearchHistory";
import SearchResult from "@/components/SearchResult";
import searchHistoryDB from "@/libs/searchHistoryDB";
import getAPI from "@/api/index";

// 지금 문제점은 PRops를 전체를 다시 줘야하는다는것이당.. 넘 복잡하다

class SearchModal extends Component {
  props: SearchModalProps;
  state: SearchModalState;
  $searchBarComponent: Component | null = null;
  $searchHistoryComponent: Component | null = null;
  $searchResultComponent: Component | null = null;
  constructor($root: Element, props: SearchModalProps) {
    super();
    this.$root = $root;
    this.props = props;
    this.state = {
      searchKewyord: "",
      searchHistory: searchHistoryDB.get(),
      isLoading: false,
      lastKey: "",
    };
  }

  init() {
    this.$target = document.createElement("div");
    this.$target.className = "modal-inner p-8";
    this.$root.appendChild(this.$target);
  }

  bindEvents() {
    const $modalCloseButton = $(".modal-close");
    $modalCloseButton &&
      $modalCloseButton.addEventListener("click", this.props.onCloseModal);
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
        onClickHistory: this.handleClickHistory.bind(this),
      });
    // this.$searchResultComponent && this.$searchResultComponent.updateProps({});
  }

  mountChildComponent() {
    this.$searchBarComponent = new SearchBar(this.$target, {
      onSubmitSearch: this.handleSubmitSearch.bind(this),
    });
    this.$searchBarComponent.render();
    this.$searchHistoryComponent = new SearchHistory(this.$target, {
      histories: this.state.searchHistory,
      onClickHistory: this.handleClickHistory.bind(this),
    });
    this.$searchHistoryComponent.render();
    this.$searchResultComponent = new SearchResult(this.$target, {
      datas: [""],
      storedVideoCount: 1,
      isLoading: false,
    });
    this.$searchResultComponent.render();
  }

  mount() {
    this.$target.innerHTML = template;
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
    };
    this.setState(nextState);
    return this.getVideos(value);
  }

  handleClickHistory(value: string) {
    if (value === this.state.searchKewyord) return;
    return this.getVideos(value);
  }

  async getVideos(keyword: string) {
    try {
      const response = await getAPI(keyword, this.state.lastKey);
      console.log(response);
    } catch (error) {
      // 추후 Alert 띄워주기
    }
  }
}

export default SearchModal;
