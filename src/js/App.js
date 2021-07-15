import { addEvents, selectDOM, addClass, removeClass } from "./utils.js";
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
    this.SavedPage = new SavedPage({
        sendVideoData: (id, videoData) => {
            switch (id){
                case 'watch' :
                    this.watchedPage.addNewVideo(videoData)
                    break;
                case 'like' :
                    console.log('like ', videoData)
                    break;
                case 'remove' :
                    console.log('remove ', videoData)
                    break;
            }
        }
    });
    this.watchedPage = new WatchedPage();
    this.likedPage = new LikedPage();

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
