import { selectDOM, loadDataFromLocalStorage, addEvents, makeDataset } from "../utils.js";
import { buildResultSection } from "../DOM.js";

export default class SavedPage {
  $selectedResult;
  constructor({ sendVideoData }) {
    this.$selectedResult = selectDOM("#selected-result");
    this.$savedButton = selectDOM("#saved-videos");
    this.sendVideoData = sendVideoData

    this.state = {
      savedVideos: [],
    };


    this.bindEvents();
    this.setState(loadDataFromLocalStorage("savedVideos"));
  }

  onSaved(event) {
    const savedVideos = event.detail.value;
    this.setState(savedVideos);
  }

  onClickButtons({target}) {
    if (target.tagName !== 'SPAN') return ;
    const {channelId, channelTitle, videoId, title, publishTime} = target.closest('article').dataset
    const dataset = makeDataset(channelId, decodeURI(channelTitle), videoId, decodeURI(title), publishTime)
    this.sendVideoData(target.id, dataset)
  }

  bindEvents() {
    addEvents(this.$selectedResult, "@save", (event) => this.onSaved(event))
    addEvents(this.$selectedResult, "click", (event) => this.onClickButtons(event))
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
