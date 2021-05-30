import Component from "@/libs/component";
import { $ } from "@/utils/dom";
import { SearchModalProps, SearchModalState } from "@/types/index";
import template from "@/templates/SearchModal";
import SearchBar from "@/components/SearchBar";
import SearchHistory from "@/components/SearchHistory";
import SearchResult from "@/components/SearchResult";
import searchHistoryDB from "@/libs/searchHistoryDB";

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
    $input.value = "";
    searchHistoryDB.set(value);
    const nextState = { ...this.state, searchHistory: searchHistoryDB.get() };
    this.setState(nextState);
  }

  handleClickHistory(e: Event) {}
}

export default SearchModal;
