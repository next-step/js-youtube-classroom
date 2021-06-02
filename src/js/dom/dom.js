const searchModalOpenButton = document.querySelector('#search-modal-open-button');
const modalClose = document.querySelector('.modal-close');
const modal = document.querySelector('.modal');
const youtubeSearchForm = document.querySelector('.youtube-search-form');
const youtubeSearchInput = document.querySelector('.youtube-search-input');
const modalVideoWrapper = document.querySelector('.modal .video-wrapper');
const mainVideoWrapper = document.querySelector('main > .video-wrapper');
const modalInner = document.querySelector('.modal-inner');
const recentSearchList = document.querySelector('.recent-search-list');
const playListLength = document.querySelector('.play-list-length');
const emptyMessageContainer = document.querySelector('.empty-message-container');
const willStatus = document.querySelector('.will-status');
const watchedStatus = document.querySelector('.watched-status');

const $ = {
  searchModalOpenButton,
  modalClose,
  modal,
  youtubeSearchForm,
  youtubeSearchInput,
  modalVideoWrapper,
  modalInner,
  recentSearchList,
  playListLength,
  mainVideoWrapper,
  emptyMessageContainer,
  willStatus,
  watchedStatus,
};

export default $;
