import Component from "@/libs/component";
import template from "@/templates/SearchHistory";
import { SearchHistoryProps, SearchHistoryHandlers } from "@/types/index";

class SearchHistory extends Component {
  props: SearchHistoryProps;
  handlers: SearchHistoryHandlers;
  constructor(
    $root: Element,
    props: SearchHistoryProps,
    handlers: SearchHistoryHandlers
  ) {
    super();
    this.$root = $root;
    this.props = props;
    this.handlers = handlers;
  }

  bindEvents() {
    this.$root.addEventListener("click", (e: Event) => {
      const target = e.target as Element;
      if (!target) return;
      if (target.classList.contains("history")) {
        const value = target.textContent ?? "";
        return this.handlers.onClickHistory(value.trim());
      }
    });
  }

  mount() {
    this.$root.innerHTML = template(this.props.histories);
  }
}

export default SearchHistory;
