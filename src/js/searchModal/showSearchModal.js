import {
  renderSavedYoutubeNumber,
  renderYoutubeCards
} from 'utils/renderingUtils';
import { getSearchedYoutubeCardTemplate } from '../utils/templateUtils';
import state from './state';

const $videoWrapper = document.querySelector('.modal .video-wrapper');
const $searchButton = document.querySelector('#search-button');
const $searchInput = document.querySelector('.modal .pl-2');
const $modalClose = document.querySelector('.modal-close');
const $modal = document.querySelector('.modal');

const initializeSearchModal = () => {
  $videoWrapper.innerHTML = '';
  $searchInput.value = '';
  state.searchedValue = '';
};

// handlers
const onModalShow = () => {
  const datas = JSON.parse(localStorage.getItem('prevYoutubeDatas'));
  $modal.classList.add('open');
  renderYoutubeCards($videoWrapper, datas, getSearchedYoutubeCardTemplate);
  renderSavedYoutubeNumber();
};

const onModalClose = () => {
  $modal.classList.remove('open');
  initializeSearchModal();
};

$searchButton.addEventListener('click', onModalShow);
$modalClose.addEventListener('click', onModalClose);
