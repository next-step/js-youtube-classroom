import Component from "@/libs/component";
import { $ } from "@/utils/dom";
import { SearchModalProps } from "@/types/index";
import template from "@/templates/SearchModal";

class SearchModal extends Component {
  props: SearchModalProps;
  constructor($root: Element, props: SearchModalProps) {
    super();
    this.$root = $root;
    this.props = props;
  }

  init() {
    this.$target = document.createElement("div");
    this.$target.className = "modal-inner p-8";
    this.$root.appendChild(this.$target);
  }

  bindEvents() {
    const $modalCloseButton = $(".modal-close");
    $modalCloseButton &&
      $modalCloseButton.addEventListener("click", this.props.onCloseModal);
  }

  updateProps(nextProps: SearchModalProps) {
    this.props = nextProps;
    this.props.isModalOpen
      ? this.$root.classList.add("open")
      : this.$root.classList.remove("open");
  }

  mountChildComponent() {
    // 서치 내부 컨텐츠
  }

  mount() {
    this.$target.innerHTML = template;
  }
}

export default SearchModal;
