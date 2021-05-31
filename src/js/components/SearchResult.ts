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

  bindEvents() {
    this.$root.addEventListener("click", (e) => {
      console.log(e.target);
      // target id 가 save라면..save
      // Props로 받는 datas에는 isSaved도 있어야함.
      // save에서 저장된게 100개라면 더이상 save되지 않는다.
    });
  }

  mount() {
    if (this.props.datas.length === 0 && this.props.isLoading) {
      return (this.$root.innerHTML = loadingState);
    } else if (this.props.datas.length === 0 && !this.props.hasMore) {
      return (this.$root.innerHTML = emptyState);
    }
    this.$root.innerHTML = template(this.props.datas);
  }
}

export default SearchResult;
