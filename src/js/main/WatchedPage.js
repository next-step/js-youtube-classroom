import Page from "./Page.js";

export default class WatchedPage extends Page {
  constructor() {
    super();
    this.route = "watch"
    this.emptyMessage = "<p> 본 영상이 없습니다 😥 </p>"
  }
}

