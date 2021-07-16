import { addEvents, selectDOM, addClass, removeClass, loadDataFromLocalStorage } from "./utils.js";
import Modal from "./modal/Modal.js";
import MainPage from "./main/MainPage.js";

export default class App {
  constructor() {
    this.$buttonHeader = selectDOM(".button-header");
    this.$savedButton = selectDOM("#saved-videos");
    this.$watchedButton = selectDOM("#watched-videos");
    this.$likedButton = selectDOM("#liked-videos");

    this.Modal = new Modal();
    this.MainPage = new MainPage();

    this.state = {
      currentRoute: "",
    };

    this.bindEvents();
    this.setState("");
  }

  switchButtonSelect(id) {
    if (id.length === 0) return addClass(this.$savedButton, "bg-cyan-100");
    removeClass(this.$savedButton, "bg-cyan-100")
    removeClass(this.$watchedButton, "bg-cyan-100")
    removeClass(this.$likedButton, "bg-cyan-100")
    addClass(selectDOM(`#${id}-videos`), "bg-cyan-100")
  }

  onClickHeaderButtons({ target }) {
    if (target.tagName !== "BUTTON" || target.id === "search-button") return;
    const currentRoute = target.id.split("-")[0];
    history.pushState({ currentRoute: currentRoute }, null, `?${currentRoute}`);
    this.setState(currentRoute);
  }

  bindEvents() {
    addEvents(this.$buttonHeader, "click", (event) =>
      this.onClickHeaderButtons(event)
    );
    addEvents(window, "popstate", (event) => this.setState(event.state.currentRoute));
  }

  render() {
    this.switchButtonSelect(this.state.currentRoute);
    console.log("App render")
    console.log(this.state.currentRoute)
    if (this.state.currentRoute === ''){
      this.state.currentRoute = "saved";
        history.replaceState(
          { currentRoute: this.state.currentRoute },
          null,
          "?saved"
        );
    }
  }

  setState(currentRoute) {
    this.state.currentRoute = currentRoute;
    this.MainPage.setState(this.state.currentRoute)
    this.render();
  }
}
