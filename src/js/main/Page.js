import { selectDOM, loadDataFromLocalStorage } from "../utils.js";
import { buildResultSection } from "../DOM.js";

export default class Page {
  $selectedResult;
  constructor() {
    this.$selectedResult = selectDOM("#selected-result");
    this.route = ""
    this.emptyMessage = ""

    this.state = {
      savedVideos: [],
    };
  }

  render() {
    let resultDom = buildResultSection(this.state.savedVideos, [], 2, this.route);
    if (resultDom.length === 0) resultDom =  this.emptyMessage;
    this.$selectedResult.innerHTML = resultDom;
  }

  setState(savedVideos) {
    this.state.savedVideos = savedVideos;
    console.log('Page : ', this.state.savedVideos)
    this.render();
  }
}
