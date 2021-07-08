import { on, qs } from "./helpers.js";

import ModalView from "./View/ModalView.js";
import Controller from "./Controller/Controller.js";
import ModalSearchResult from "./View/ModalSearchResult.js";
const $searchButton = qs("#search-button");
const $modalClose = qs(".modal-close");
const $modal = qs(".modal");

const onModalShow = () => {
  $modal.classList.add("open");
};

const onModalClose = () => {
  $modal.classList.remove("open");
};
$searchButton.addEventListener("click", onModalShow);
$modalClose.addEventListener("click", onModalClose);

on($modal, "submit", (event)=> event.preventDefault())



const tag = "[INDEX]"
document.addEventListener("DOMContentLoaded", index)
function index(){
  console.log(tag, "main")
  const views = {
    modalView: new ModalView(),
    modalSearchResult: new ModalSearchResult()
  }
  new Controller(views)
}