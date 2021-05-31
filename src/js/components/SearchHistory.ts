import Component from "@/libs/component";
import template from "@/templates/SearchHistory";
import { CLASS_NAMES } from "@/constants/index";
import { SearchHistoryProps, SearchHistoryHandlers } from "@/types/index";

class SearchHistory extends Component {
  props: SearchHistoryProps;
  handlers: SearchHistoryHandlers;
  constructor(
    $root: HTMLElement,
    props: SearchHistoryProps,
    handlers: SearchHistoryHandlers
  ) {
    super();
    this.$root = $root;
    this.props = props;
    this.handlers = handlers;
  }

  bindEvents(): void {
    this.$root.addEventListener("click", (e: Event) => {
      const target = e.target as HTMLElement;
      if (!target || !target.classList.contains(CLASS_NAMES.HISTORY)) return;
      const value = target.textContent ?? "";
      this.handlers.onClickHistory(value.trim());
    });
  }

  mount(): void {
    this.$root.innerHTML = template(this.props.histories);
  }
}

export default SearchHistory;
