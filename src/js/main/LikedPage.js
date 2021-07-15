import { selectDOM, loadDataFromLocalStorage } from "../utils.js";
import { buildResultSection } from "../DOM.js";

export default class LikedPage {
  $selectedResult;
  constructor() {
    this.$selectedResult = selectDOM("#selected-result");
    this.$likedButton = selectDOM("#liked-videos");


    this.state = {
      watchedVideos: []
    }

    this.setState('');
  }

  render() {
    this.$selectedResult.innerHTML = "Likied : None 😥"
  }

  setState() {
    
    this.render();
  }
}
