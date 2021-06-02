import Component from "@/libs/component";
import template from "@/templates/SearchHistory";
import { $ } from "@/utils/dom";
import { CLASS_NAMES } from "@/constants/index";
import { SearchHistoryProps, SearchHistoryHandlers } from "@/types/index";

class SearchHistory extends Component<
  unknown,
  SearchHistoryProps,
  SearchHistoryHandlers
> {
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
      const value = (target.textContent ?? "").trim();
      if (value) {
        const $input = $("input") as HTMLInputElement;
        $input.value = value;
      }
      this.handlers.onClickHistory(value);
    });
  }

  mount(): void {
    this.$root.innerHTML = template(this.props.histories);
  }
}

export default SearchHistory;
