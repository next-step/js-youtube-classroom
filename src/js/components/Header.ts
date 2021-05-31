import Component from "@/libs/component";
import { NAVIGATION_ID } from "@/utils/constants";
import { Navigations, HeaderProps, HeaderHanlders } from "@/types/index";
import template from "@/templates/Header";

class Header extends Component {
  props: HeaderProps;
  handlers: HeaderHanlders;
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

  init(): void {
    this.$target = document.createElement("header");
    this.$target.className = "text-center font-bold";
    this.$root.appendChild(this.$target);
  }

  bindEvents(): void {
    this.$target.addEventListener("click", (e: Event) => {
      const target = e.target as HTMLButtonElement;
      const id = target.id as Navigations;
      if (!NAVIGATION_ID[id]) return;
      this.handlers.onChange(id);
    });
  }

  mount(): void {
    this.$target.innerHTML = template(this.props.filter);
  }
}

export default Header;
