import { $, loadDataFromLocalStorage } from "../utils.js";
import { buildResultSection } from "../DOM.js";

export default class MainPage {
  constructor() {
    this.$savedResult = $("#saved-result");

    this.state = {
      savedVideos: [],
    };

    this.$savedResult.addEventListener("@save", (event) => {
      const savedVideos = event.detail.value;
      console.log(savedVideos);
      this.setState(savedVideos);
    });

    this.setState(loadDataFromLocalStorage("savedVideos"));
  }

  render() {
    let savedSection = ``;
    if (this.state.savedVideos.length === 0) {
      savedSection = `<p> 영상이 없습니다. 😥 </p>`;
    } else {
      savedSection = buildResultSection(this.state.savedVideos, [], 2);
    }
    this.$savedResult.innerHTML = savedSection;
  }

  setState(savedVideos) {
    this.state.savedVideos = savedVideos;
    this.render();
  }
}
