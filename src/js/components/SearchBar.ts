import Component from "@/libs/component";
import { $ } from "@/utils/dom";
import { SearchBarHandlers } from "@/types/index";

class SearchBar extends Component<unknown, unknown, SearchBarHandlers> {
  constructor(
    readonly $root: HTMLElement,
    readonly handlers: SearchBarHandlers
  ) {
    super();
  }

  bindEvents(): void {
    this.$root.addEventListener("submit", (e: Event) => {
      e.preventDefault();
      const $target = e.target as HTMLElement;
      const $input = $("input", $target) as HTMLInputElement;
      if (!$target || !$input) return;
      this.handlers.onSubmitSearch($input.value.trim());
    });
  }
}

export default SearchBar;
