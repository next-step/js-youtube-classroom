import {
  selectDOM,
  loadDataFromLocalStorage,
  checkDuplicateID,
  saveDataToLocalStorage,
} from "../utils.js";
import { buildResultSection } from "../DOM.js";

export default class WatchedPage {
  $selectedResult;
  constructor() {
    this.$selectedResult = selectDOM("#selected-result");
    this.$watchedButton = selectDOM("#watched-videos");

    this.state = {
      watchedVideos: [],
    };

    this.setState();
  }

  addNewVideo(data) {
    if (checkDuplicateID(data.videoId, this.state.watchedVideos) >= 0)
      return console.log("dup");
    this.state.watchedVideos.push(data);
    saveDataToLocalStorage('watchedVideos', this.state.watchedVideos)
  }

  render() {
    const resultDom =
      this.state.watchedVideos.length === 0
        ? "Watched : None 😥"
        : buildResultSection(this.state.watchedVideos, [], 2);
    this.$selectedResult.innerHTML = resultDom;
  }

  setState() {
    this.state.watchedVideos = loadDataFromLocalStorage('watchedVideos')
    this.render();
  }
}
