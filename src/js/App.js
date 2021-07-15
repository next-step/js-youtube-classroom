import { addEvents, selectDOM } from "./utils.js";
import Modal from "./modal/Modal.js";
import SavedPage from "./main/SavedPage.js";
import WatchedPage from "./main/WatchedPage.js";
import LikedPage from "./main/LikedPage.js";

export default class App {
  constructor() {
    this.$buttonHeader = selectDOM(".button-header");
    this.$savedButton = selectDOM("#saved-videos");
    this.$watchedButton = selectDOM("#watched-videos");
    this.$likedButton = selectDOM("#liked-videos");

    this.Modal = new Modal();
    this.SavedPage = new SavedPage();
    this.watchedPage = new WatchedPage();
    this.likedPage = new LikedPage();

    this.state = {
      currentRoute: "",
    };

    this.bindEvents();
    this.setState("");
  }

  switchButtonSelect(id) {
    if (id.length === 0) return this.$savedButton.classList.add("bg-cyan-100");
    this.$savedButton.classList.remove("bg-cyan-100");
    this.$watchedButton.classList.remove("bg-cyan-100");
    this.$likedButton.classList.remove("bg-cyan-100");
    selectDOM(`#${id}-videos`).classList.add("bg-cyan-100");
  }

  onClickHeaderButtons({ target }) {
    if (target.tagName !== "BUTTON") return;
    const currentRoute = target.id.split("-")[0];
    history.pushState({ currentRoute: currentRoute }, null, `?${currentRoute}`);
    this.setState(currentRoute);
  }

  bindEvents() {
    addEvents(this.$buttonHeader, "click", (event) =>
      this.onClickHeaderButtons(event)
    );
    addEvents(window, "popstate", (event) => {
      this.setState(event.state.currentRoute);
    });
  }

  render() {
    this.switchButtonSelect(this.state.currentRoute);
    switch (this.state.currentRoute) {
      case "saved":
        this.SavedPage.render();
        break;
      case "watched":
        this.watchedPage.render();
        break;
      case "liked":
          this.likedPage.render();
        break;
      default:
        this.state.currentRoute = "saved";
        history.replaceState(
          { currentRoute: this.state.currentRoute },
          null,
          "?saved"
        );
        this.SavedPage.render();
    }
  }

  setState(currentRoute) {
    this.state.currentRoute = currentRoute;
    this.render();
  }
}
