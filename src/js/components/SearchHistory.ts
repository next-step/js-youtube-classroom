import Component from "@/libs/component";
import template from "@/templates/SearchHistory";
import { SearchHistoryProps } from "@/types/index";

class SearchHistory extends Component {
  props: SearchHistoryProps;
  constructor($root: Element, props: SearchHistoryProps) {
    super();
    this.$root = $root;
    this.props = props;
  }

  init() {
    this.$target = document.createElement("section");
    this.$target.className = "mt-2";
    this.$root.appendChild(this.$target);
  }

  mount() {
    this.$target.innerHTML = template(this.props.histories);
  }
}

export default SearchHistory;
