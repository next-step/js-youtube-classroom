import { handleMoreVideoLoading } from "../handlers/moreVideoLoading.js";
import { $ } from "../utils/DOM.js";

export const intersectionObserver = {
  value: {},
  options: {
    root: $("#modal-inner"),
    rootMargin: "0px",
    threshold: 0.85,
  },

  init() {
    this.set(
      new IntersectionObserver(handleMoreVideoLoading.bind(this), this.options)
    );
  },

  set(observer) {
    this.value = observer;
  },

  get() {
    return this.value;
  },

  disconnect() {
    this.value.disconnect();
  },

  observe($target) {
    this.value.observe($target);
  },
};
