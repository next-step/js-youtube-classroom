import Component from "@/libs/component";
import { SearchBarHandlers } from "@/types/index";

class SearchBar extends Component {
  handlers: SearchBarHandlers;
  constructor($root: Element, handlers: SearchBarHandlers) {
    super();
    this.$root = $root;
    this.handlers = handlers;
  }

  bindEvents() {
    this.$root.addEventListener("submit", this.handlers.onSubmitSearch);
  }
}

export default SearchBar;
