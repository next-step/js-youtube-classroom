import { selectDOM, loadDataFromLocalStorage, checkDuplicateID } from "../utils.js";
import { buildResultSection } from "../DOM.js";

export default class WatchedPage {
  $selectedResult;
  constructor() {
    this.$selectedResult = selectDOM("#selected-result");
    this.$watchedButton = selectDOM("#watched-videos");


    this.state = {
      watchedVideos: []
    }

    this.setState('');
  }

  addNewVideo (data) {
    if (checkDuplicateID(data.videoId, this.state.watchedVideos) >= 0) return console.log("dup")
    this.state.watchedVideos.push(data)
    console.log(this.state.watchedVideos)
  }

  render() {
    this.$selectedResult.innerHTML = "Watched : None 😥"
  }

  setState() {
    
    this.render();
  }
}
