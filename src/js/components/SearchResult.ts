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

  bindEvents() {
    const target = document.querySelector(".observer");
    console.log(target);
    const options = {
      root: this.$target,
      rootMargin: "0px",
      threshold: 1.0,
    };
    if (!target) return;

    const _onObserve = (entries: any, observer: any) => {
      const ioTarget = entries[0].target;
      console.log(entries);
      if (entries[0].isIntersecting) {
        console.log("ㅎㅇ");
      }
    };

    const observer = new IntersectionObserver(_onObserve, options);
    observer.observe(target);
  }

  mount() {
    this.$root.innerHTML = template(
      this.props.storedVideoCount,
      this.props.datas
    );
  }
}

export default SearchResult;
