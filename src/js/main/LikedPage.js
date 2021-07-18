import Page from "./Page.js";

export default class LikedPage extends Page {
  constructor() {
    super();
    this.route = "like"
    this.emptyMessage = "<p> 좋아요 한 영상이 없습니다. 😥 </p>"
  }
}
