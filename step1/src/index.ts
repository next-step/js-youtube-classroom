import "./assets/css/index.css";

const $searchButton: HTMLElement = document.querySelector("#search-button")!;
const $modalClose: HTMLElement = document.querySelector(".modal-close")!;
const $modal: HTMLElement = document.querySelector(".modal")!;

const onModalShow = () => {
  $modal.classList.add("open");
};

const onModalClose = () => {
  $modal.classList.remove("open");
};

$searchButton.addEventListener("click", onModalShow);
$modalClose.addEventListener("click", onModalClose);
