import { selectDOM, loadDataFromLocalStorage, saveDataToLocalStorage, checkDuplicateID } from "../utils.js";
import { buildResultSection } from "../DOM.js";

export default class LikedPage {
  $selectedResult;
  constructor() {
    this.$selectedResult = selectDOM("#selected-result");
    this.$likedButton = selectDOM("#liked-videos");


    this.state = {
      likedVideos: []
    }

    this.setState()
  }

  addNewVideo(data) {
    if (checkDuplicateID(data.videoId, this.state.likedVideos) >= 0)
      return console.log("dup");
    this.state.likedVideos.push(data);
    saveDataToLocalStorage('likedVideos', this.state.likedVideos)
  }

  render() {
    const resultDom =
      this.state.likedVideos.length === 0
        ? "Liked : None 😥"
        : buildResultSection(this.state.likedVideos, [], 2);
    this.$selectedResult.innerHTML = resultDom;
  }

  setState() {
    this.state.likedVideos = loadDataFromLocalStorage('likedVideos')
    this.render();
  }
}
