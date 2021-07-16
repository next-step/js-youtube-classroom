import {
  selectDOM,
  loadDataFromLocalStorage,
  addEvents,
  makeDataset,
  checkDuplicateID,
  saveDataToLocalStorage,
  setVideoState
} from "../utils.js";
import { buildResultSection } from "../DOM.js";

export default class SavedPage {
  $selectedResult;
  constructor({ sendVideoData, getRoute }) {
    this.$selectedResult = selectDOM("#selected-result");
    this.$savedButton = selectDOM("#saved-videos");
    this.sendVideoData = sendVideoData;
    this.getRoute = getRoute

    this.state = {
      savedVideos: [],
    };

    this.bindEvents();
    this.setState(loadDataFromLocalStorage("savedVideos"));
  }

  onClickButtons({ target }) {
    // if (target.tagName !== "SPAN" || this.getRoute() !== 'saved') return;
    // console.log('saved page event')
    // const { channelId, channelTitle, videoId, title, publishTime } =
    //   target.closest("article").dataset;
    // const dataset = makeDataset(
    //   channelId,
    //   decodeURI(channelTitle),
    //   videoId,
    //   decodeURI(title),
    //   publishTime
    // );
    // const dataPos = checkDuplicateID(videoId, this.state.savedVideos);
    // switch (target.id) {
    //   case "watch":
    //   case "remove":
    //     this.state.savedVideos.splice(dataPos, 1);
    //     break;
    //   case "like":
    //     break;
    // }
    // saveDataToLocalStorage("savedVideos", this.state.savedVideos);
    // this.sendVideoData(target.id, dataset);
  }

  bindEvents() {
    addEvents(this.$selectedResult, "click", (event) =>
      this.onClickButtons(event)
    );
  }

  render() {
    let savedSection = ``;
    savedSection =
      this.state.savedVideos.length === 0
        ? `<p> 영상이 없습니다. 😥 </p>`
        : buildResultSection(this.state.savedVideos, [], 2, setVideoState(0, 0));
    this.$selectedResult.innerHTML = savedSection;
  }

  setState(savedVideos) {
    this.state.savedVideos = savedVideos
    this.render();
  }
}
