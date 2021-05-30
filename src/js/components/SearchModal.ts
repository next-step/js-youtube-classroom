import Component from "@/libs/component";
import { $ } from "@/utils/dom";
import { SearchModalProps } from "@/types/index";
import template from "@/templates/SearchModal";

class SearchModal extends Component {
  state: SearchModalProps;
  constructor($root: Element, props: SearchModalProps) {
    super();
    this.$root = $root;
    this.state = props;
  }

  init() {
    this.$target = document.createElement("div");
    this.$target.className = "modal-inner p-8";
    this.$root.appendChild(this.$target);
  }

  bindEvents() {
    const $modalCloseButton = $(".modal-close");
    $modalCloseButton &&
      $modalCloseButton.addEventListener("click", this.state.onCloseModal);
  }

  setState(nextState: SearchModalProps) {
    this.state = nextState;
    this.state.isModalOpen
      ? this.$root.classList.add("open")
      : this.$root.classList.remove("open");
  }

  mount() {
    this.$target.innerHTML = template;
  }
}

export default SearchModal;
