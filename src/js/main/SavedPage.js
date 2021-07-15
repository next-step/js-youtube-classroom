import { selectDOM, loadDataFromLocalStorage } from "../utils.js";
import { buildResultSection } from "../DOM.js";

export default class SavedPage {
  $selectedResult;
  constructor() {
    this.$selectedResult = selectDOM("#selected-result");
    this.$savedButton = selectDOM("#saved-videos");

    this.state = {
      savedVideos: [],
    };

    this.$selectedResult.addEventListener("@save", (event) => {
      const savedVideos = event.detail.value;
      this.setState(savedVideos);
    });

    this.setState(loadDataFromLocalStorage("savedVideos"));
  }

  render() {
    let savedSection = ``;
    savedSection =
      this.state.savedVideos.length === 0
        ? `<p> 영상이 없습니다. 😥 </p>`
        : buildResultSection(this.state.savedVideos, [], 2);
    this.$selectedResult.innerHTML = savedSection;
  }

  setState(savedVideos) {
    this.state.savedVideos = savedVideos;
    this.render();
  }
}
