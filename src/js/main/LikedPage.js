import Page from "./Page.js";

export default class LikedPage extends Page {
  constructor() {
    super();
    this.route = "like"
    this.emptyMessage = "<p> 좋아요 한 영상이 없습니다. 😥 </p>"
  }
}


// export default class LikedPage {
//   $selectedResult;
//   constructor() {
//     this.$selectedResult = selectDOM("#selected-result");

//     this.state = {
//       savedVideos: []
//     }

//   }

//   render() {
//     let resultDom = buildResultSection(this.state.savedVideos, [], 2, 'like');
//     if (resultDom.length === 0) resultDom = "Liked : None 😥"
//     this.$selectedResult.innerHTML = resultDom;
//   }

//   setState(savedVideos) {
//     this.state.savedVideos = savedVideos
//     this.render();
//   }
// }
