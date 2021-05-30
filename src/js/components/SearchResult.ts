import Component from "@/libs/component";
import template from "@/templates/SearchResult";
import { SearchResultProps } from "@/types/index";

class SearchResult extends Component {
  props: SearchResultProps;
  constructor($root: Element, props: SearchResultProps) {
    super();
    this.$root = $root;
    this.props = props;
  }

  init() {
    this.$target = document.createElement("section");
    this.$root.appendChild(this.$target);
  }

  mount() {
    this.$target.innerHTML = template(
      this.props.storedVideoCount,
      this.props.datas
    );
  }
}

export default SearchResult;
