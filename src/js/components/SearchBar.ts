import Component from "@/libs/component";
import { $ } from "@/utils/dom";
import { SearchBarHandlers } from "@/types/index";

class SearchBar extends Component {
  handlers: SearchBarHandlers;

  constructor($root: HTMLElement, handlers: SearchBarHandlers) {
    super();
    this.$root = $root;
    this.handlers = handlers;
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
