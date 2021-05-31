import Component from "@/libs/component";
import { NAVIGATION_ID } from "@/utils/constants";
import { Navigations, HeaderProps, HeaderHanlders } from "@/types/index";
import template from "@/templates/Header";

class Header extends Component {
  props: HeaderProps;
  handlers: HeaderHanlders;
  constructor($root: Element, props: HeaderProps, handlers: HeaderHanlders) {
    super();
    this.$root = $root;
    this.props = props;
    this.handlers = handlers;
  }

  init() {
    this.$target = document.createElement("header");
    this.$target.className = "text-center font-bold";
    this.$root.appendChild(this.$target);
  }

  bindEvents() {
    this.$target.addEventListener("click", (e: Event) => {
      const target = e.target as HTMLButtonElement;
      const id = target.id as Navigations;
      if (!NAVIGATION_ID[id]) return;
      return this.handlers.onChange(id);
    });
  }

  mount() {
    this.$target.innerHTML = template(this.props.filter);
  }
}

export default Header;
