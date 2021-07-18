import ModalView from "./View/ModalView.js";
import Controller from "./Controller/Controller.js";
import ModalSearchResult from "./View/ModalSearchResult.js";
import ModalScrollView from "./View/ModalScrollView.js";
import ModalLatestKeywordList from "./View/ModalLatestKeywordList.js";
import MainView from "./View/MainView.js";
import CheckBtnView from "./View/CheckBtnView.js";
import watchedView from "./View/WatchedView.js";
import likedView from "./View/LikedView.js";

const tag = "[INDEX]"
document.addEventListener("DOMContentLoaded", index)
function index(){
  const views = {
    mainView: new MainView(),
    modalView: new ModalView(),
    modalSearchResult: new ModalSearchResult(),
    modalScrollView: new ModalScrollView(),
    modalLatestKeywordList: new ModalLatestKeywordList(),
    checkBtnView: new CheckBtnView(),
    watchedView,
    likedView
  }
  new Controller(views)
}