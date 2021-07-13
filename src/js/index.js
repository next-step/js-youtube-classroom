import App from './App.js';

new App({
	$searchButton: document.querySelector("#search-button"),
	$modal: document.querySelector(".modal"),
	$modalClose: document.querySelector(".modal-close"),
  $searchInput: document.querySelector(".searchInput"),
  $searchInputButton: document.querySelector('.searchInputButton'),
});

// const $searchButton = document.querySelector("#search-button");
// const $modalClose = document.querySelector(".modal-close");
// const $modal = document.querySelector(".modal");

// const onModalShow = () => {
//   $modal.classList.add("open");
// };

// const onModalClose = () => {
//   $modal.classList.remove("open");
// };

// $searchButton.addEventListener("click", onModalShow);
// $modalClose.addEventListener("click", onModalClose);
