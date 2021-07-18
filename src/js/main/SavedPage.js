import Page from "./Page.js";

export default class SavedPage extends Page {
  constructor() {
    super()
    this.route = "save"
    this.emptyMessage = "<p> 볼 영상이 없습니다 😥 </p>"
  }

}
