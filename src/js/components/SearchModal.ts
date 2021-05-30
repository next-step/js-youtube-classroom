import Component from "@/libs/component";
import { $ } from "@/utils/dom";
import { SearchModalProps, SearchModalState } from "@/types/index";
import template from "@/templates/SearchModal";
import SearchBar from "@/components/SearchBar";
import SearchHistory from "@/components/SearchHistory";
import SearchResult from "@/components/SearchResult";

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
      recentHistory: [],
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

  mountChildComponent() {
    this.$searchBarComponent = new SearchBar(this.$target, {
      onSubmitSearch: this.handleSubmitSearch.bind(this),
    });
    this.$searchBarComponent.render();
    this.$searchHistoryComponent = new SearchHistory(this.$target, {
      histories: ["??", "우왕"],
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

  handleSubmitSearch(e: Event) {}

  handleClickHistory(e: Event) {}
}

export default SearchModal;
