import Component from "@/libs/component";
import { FILTER_ID, SEARCH_BUTTON_ID } from "@/constants/index";
import { Navigations, HeaderProps, HeaderHanlders } from "@/types/index";
import template from "@/templates/Header";

class Header extends Component<unknown, HeaderProps, HeaderHanlders> {
  constructor(
    $root: HTMLElement,
    props: HeaderProps,
    handlers: HeaderHanlders
  ) {
    super();
    this.$root = $root;
    this.props = props;
    this.handlers = handlers;
  }

  bindEvents(): void {
    this.$root.addEventListener("click", (e: Event) => {
      const target = e.target as HTMLButtonElement;
      const id = target.id as Navigations;
      if (!FILTER_ID[id] && id !== SEARCH_BUTTON_ID) return;
      this.handlers.onChange(id);
    });
  }

  mount(): void {
    this.$root.innerHTML = template(this.props.filter);
  }
}

export default Header;
