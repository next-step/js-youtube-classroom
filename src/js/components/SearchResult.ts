import Component from "@/libs/component";
import template, { emptyState, loadingState } from "@/templates/SearchResult";
import { SearchResultProps } from "@/types/index";

class SearchResult extends Component {
  props: SearchResultProps;
  constructor($root: Element, props: SearchResultProps) {
    super();
    this.$root = $root;
    this.props = props;
  }

  mount() {
    if (this.props.datas.length === 0 && this.props.isLoading) {
      return (this.$root.innerHTML = loadingState);
    } else if (this.props.datas.length === 0) {
      return (this.$root.innerHTML = emptyState);
    }
    this.$root.innerHTML = template(this.props.datas);
  }
}

export default SearchResult;
