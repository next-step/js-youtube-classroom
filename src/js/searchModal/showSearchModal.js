import { renderSavedYoutubeNumber } from 'utils/renderingUtils';

const $searchButton = document.querySelector('#search-button');
const $modalClose = document.querySelector('.modal-close');
const $modal = document.querySelector('.modal');

const onModalShow = () => {
  $modal.classList.add('open');
  renderSavedYoutubeNumber();
};

const onModalClose = () => {
  $modal.classList.remove('open');
};

$searchButton.addEventListener('click', onModalShow);
$modalClose.addEventListener('click', onModalClose);
