import Component from "@/libs/component";
import { SearchBarProps } from "@/types/index";

class SearchBar extends Component {
  props: SearchBarProps;
  constructor($root: Element, props: SearchBarProps) {
    super();
    this.$root = $root;
    this.props = props;
  }

  bindEvents() {
    this.$root.addEventListener("submit", this.props.onSubmitSearch);
  }
}

export default SearchBar;
