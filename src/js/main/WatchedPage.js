import {
  selectDOM,
} from "../utils.js";
import { buildResultSection } from "../DOM.js";
import Page from "./Page.js";

export default class WatchedPage extends Page {
  constructor() {
    super();
    this.route = "watch"
    this.emptyMessage = "<p> 본 영상이 없습니다 😥 </p>"
  }
}

// export default class WatchedPage {
//   $selectedResult;
//   constructor() {
//     this.$selectedResult = selectDOM("#selected-result");

//     this.state = {
//       savedVideos: [],
//     };
//   }

//   render() {
//     let resultDom = buildResultSection(this.state.savedVideos, [], 2, 'watch');
//     if (resultDom.length === 0) resultDom = "Watched : None 😥"
//     this.$selectedResult.innerHTML = resultDom;
//   }

//   setState(savedVideos) {
//     this.state.savedVideos = savedVideos
//     this.render();
//   }
// }
