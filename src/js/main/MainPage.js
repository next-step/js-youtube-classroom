import { addEvents, selectDOM, addClass, removeClass, loadDataFromLocalStorage } from "../utils.js";
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

        this.SavedPage = new SavedPage({
            sendVideoData: (id, videoData) => {
                switch (id){
                    case 'watch' :
                        this.watchedPage.addNewVideo(videoData)
                        break;
                    case 'like' :
                        //this.likedPage.addNewVideo(videoData)
                        console.log('like ', videoData)
                        break;
                    case 'remove' :
                        
                        console.log('remove ', videoData)
                        break;
                }
                this.render()
            },
            getRoute: () => {
              return this.state.currentRoute
            }
        });
        this.watchedPage = new WatchedPage();
        this.likedPage = new LikedPage();
        this.bindEvents();
    }

    bindEvents() {
        addEvents(this.$selectedResult, "@save", () => this.setState());
    }

    render() {
        switch (this.state.currentRoute) {
            case "saved":
              this.SavedPage.setState(this.state.savedVideos);
              break;
            case "watched":
              this.watchedPage.render();
              break;
            case "liked":
                this.likedPage.render();
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