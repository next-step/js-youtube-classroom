import { addEvents, selectDOM, addClass, removeClass, loadDataFromLocalStorage, saveDataToLocalStorage, getVideoDataFromId, checkDuplicateID } from "../utils.js";
import SavedPage from "./SavedPage.js";
import WatchedPage from "./WatchedPage.js";
import LikedPage from "./LikedPage.js";

export default class MainPage {
    constructor(){
        this.$selectedResult = selectDOM("#selected-result");

        this.state = {
            savedVideos: [],
            currentRoute : ''
        }

        this.SavedPage = new SavedPage();
        this.WatchedPage = new WatchedPage();
        this.LikedPage = new LikedPage();
        this.bindEvents();
    }

    onClickVideoButtons({target}) {
        if (target.tagName !== 'SPAN') return ;
        const targetId = target.id
        const videoId = target.closest('article').dataset.videoId
        const videoPos = checkDuplicateID(videoId, this.state.savedVideos)
        switch(targetId) {
            case 'watch' :
                this.state.savedVideos[videoPos].watch ^= 1
                break;
            case 'like' :
                this.state.savedVideos[videoPos].like ^= 1
                break;
            case 'remove' :
                if (!confirm(`정말 "${this.state.savedVideos[videoPos].videoTitle}" 을(를) 삭제하시겠습니까?`)) return;
                this.state.savedVideos.splice(videoPos, 1)
                break;
        }
        saveDataToLocalStorage('savedVideos', this.state.savedVideos)
        this.setState(this.state.currentRoute)
    }

    bindEvents() {
        addEvents(this.$selectedResult, "@save", () => this.setState());
        addEvents(this.$selectedResult, "click", (event) => this.onClickVideoButtons(event))
    }

    render() {
        switch (this.state.currentRoute) {
            case "saved":
              this.SavedPage.setState(this.state.savedVideos);
              break;
            case "watched":
              this.WatchedPage.setState(this.state.savedVideos);
              break;
            case "liked":
                this.LikedPage.setState(this.state.savedVideos);
              break;
            default:
              this.state.currentRoute = "saved";
              this.SavedPage.setState(this.state.savedVideos);
          }
    }

    setState(currentRoute){
        this.state.currentRoute = currentRoute;
        this.state.savedVideos = loadDataFromLocalStorage('savedVideos')
        this.render();
    }
}