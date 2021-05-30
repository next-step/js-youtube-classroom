import Component from "@/libs/component";
import template from "@/templates/SearchBar";
import { SearchBarProps } from "@/types/index";

class SearchBar extends Component {
  props: SearchBarProps;
  constructor($root: Element, props: SearchBarProps) {
    super();
    this.$root = $root;
    this.props = props;
  }

  bindEvents() {
    this.$target.addEventListener("submit", this.props.onSubmitSearch);
  }
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
