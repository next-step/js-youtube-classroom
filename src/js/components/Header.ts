import Component from "@/libs/component";
import { NAVIGATION_ID } from "@/utils/constants";
import { Navigations, HeaderProps } from "@/types/index";
import template from "@/templates/Header";

class Header extends Component {
  state: HeaderProps;
  constructor($root: Element, props: HeaderProps) {
    super();
    this.$root = $root;
    this.state = props;
  }

  init() {
    this.$target = document.createElement("header");
    this.$target.className = "text-center font-bold";
    this.$root.appendChild(this.$target);
  }

  bindEvents() {
    this.$target.addEventListener("click", (e) => {
      const target = e.target as HTMLButtonElement;
      const id = target.id as Navigations;
      if (!NAVIGATION_ID[id]) return;
      return this.state.onChange(id);
    });
  }

  mount() {
    this.$target.innerHTML = template(this.state.filter);
  }
}

export default Header;
