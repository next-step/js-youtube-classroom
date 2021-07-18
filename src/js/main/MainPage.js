import { addEvents, selectDOM, loadDataFromLocalStorage, saveDataToLocalStorage, checkDuplicateID, emit } from "../utils.js";
import SavedPage from "./SavedPage.js";
import WatchedPage from "./WatchedPage.js";
import LikedPage from "./LikedPage.js";

export default class MainPage {
    constructor(){
        this.$selectedResult = selectDOM("#selected-result");
        this.$snackBar = selectDOM("#snackbar")

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
        let message = "Temp"
        switch(targetId) {
            case 'watch' :
                this.state.savedVideos[videoPos].watch ^= 1
                message = this.state.savedVideos[videoPos].watch === 1 ? 
                "본 영상으로 이동되었습니다!" :
                "본 영상에서 제거되었습니다!"
                break;
            case 'like' :
                this.state.savedVideos[videoPos].like ^= 1
                message = this.state.savedVideos[videoPos].like === 1 ? 
                "좋아요 한 영상으로 지정되었습니다!" :
                "좋아요 한 영상에서 제거되었습니다!"
                break;
            case 'remove' :
                if (!confirm(`정말 "${this.state.savedVideos[videoPos].videoTitle}" 을(를) 삭제하시겠습니까?`)) return;
                this.state.savedVideos.splice(videoPos, 1)
                message = "저장된 영상이 삭제되었습니다!"
                break;
        }
        saveDataToLocalStorage('savedVideos', this.state.savedVideos)
        emit(selectDOM("#snackbar"), "@snack", { message });
        this.setState(this.state.currentRoute)
    }

    showSnackbarkMessage (event){
        this.$snackBar.innerHTML = event.detail.message
        this.$snackBar.classList.toggle("show")
        setTimeout(() => {
            this.$snackBar.classList.toggle("show")
        }, 3000)
    }

    bindEvents() {
        addEvents(this.$snackBar, "@snack", (event) => this.showSnackbarkMessage(event))
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
