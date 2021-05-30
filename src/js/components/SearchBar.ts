import Component from "@/libs/component";
import template from "@/templates/SearchBar";
import { SearchBarProps } from "@/types/index";

class SearchBar extends Component {
  constructor($root: Element, props: SearchBarProps) {
    super();
    this.$root = $root;
    this.props = props;
  }

  bindEvents() {}
  init() {
    this.$target = document.createElement("form");
    this.$target.className = "d-flex";
    this.$root.appendChild(this.$target);
  }

  mount() {
    this.$target.innerHTML = template;
  }
}

export default SearchBar;
