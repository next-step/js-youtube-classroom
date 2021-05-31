import Component from "@/libs/component";
import template, { emptyState, loadingState } from "@/templates/SearchResult";
import { SearchResultProps, SearchResultHandlers } from "@/types/index";

class SearchResult extends Component {
  props: SearchResultProps;
  handlers: SearchResultHandlers;

  constructor(
    $root: Element,
    props: SearchResultProps,
    handlers: SearchResultHandlers
  ) {
    super();
    this.$root = $root;
    this.props = props;
    this.handlers = handlers;
  }

  bindEvents() {
    this.$root.addEventListener("click", (e: Event) => {
      const $button = e.target as HTMLElement;
      const type = $button.id;
      if (type !== "save" && type !== "unsaved") return;
      if (type === "save" && this.props.storedDatas.size === 100) return;
      const $target = $button.closest(".clip") as HTMLElement;
      if (!$target) return;
      const id = $target.dataset.id as string;
      const assignAction = {
        save: () => {
          $button.id = "unsaved";
          $button.innerText = "↪️ 저장취소";
        },
        unsaved: () => {
          $button.id = "save";
          $button.innerText = "⬇️ 저장";
        },
      };
      assignAction[type]();
      this.handlers.onClickButton(id, type);
    });
  }

  mount() {
    if (this.props.datas.length === 0 && this.props.isLoading) {
      return (this.$root.innerHTML = loadingState);
    } else if (this.props.datas.length === 0 && !this.props.hasMore) {
      return (this.$root.innerHTML = emptyState);
    }
    this.$root.innerHTML = template(this.props.datas, this.props.storedDatas);
  }
}

export default SearchResult;
