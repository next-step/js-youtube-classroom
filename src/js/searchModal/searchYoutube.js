import getSearchedData from 'api/getSearchedData';
import {
  renderingUtils,
  templateUtils,
  skeletonUtils,
  createObservedTarget
} from 'utils';
import { hideSaveButton, saveYoutubeId } from 'searchModal';

const $searchBtn = document.querySelector('.modal form .btn');
const $searchInput = document.querySelector('.modal .pl-2');
const $videoWrapper = document.querySelector('.modal .video-wrapper');
const $modalInner = document.querySelector('.modal-inner');

let isFirstPage = true;

const initializeSearchModal = () => {
  isFirstPage = true;
  $videoWrapper.innerHTML = '';
};
const searchYoutube = (() => {
  const SHOWED_RESULTS_NUMBER = 10;

  let nextPageToken = '';
  let searchedValue = '';

  const getSearchedValue = newSearchedValue => {
    const isNewSearch = newSearchedValue !== searchedValue;

    if (isNewSearch) {
      searchedValue = newSearchedValue;
      initializeSearchModal();
    }

    return searchedValue;
  };
  const renderResult = response => {
    const searchedItems = response.data.items;
    const isNoResult = !searchedItems.length;

    if (isNoResult) renderingUtils.renderNoResult($videoWrapper);
    else {
      skeletonUtils.hideSkeleton($videoWrapper);
      renderingUtils.renderYoutubeCards(
        $videoWrapper,
        searchedItems,
        templateUtils.getSearchedYoutubeCardTemplate
      );

      nextPageToken = response.data.nextPageToken;
      isFirstPage = false;
    }
  };

  return async () => {
    skeletonUtils.showSkeleton($videoWrapper, SHOWED_RESULTS_NUMBER);

    const searchedValue = getSearchedValue($searchInput.value);
    const response = await getSearchedData(
      searchedValue,
      SHOWED_RESULTS_NUMBER,
      nextPageToken
    );
    renderResult(response);
  };
})();

const onSearchBtnClick = () => {
  searchYoutube();
};
const onSearchInputKeypress = e => {
  if (e.key !== 'Enter') return;
  e.preventDefault();
  searchYoutube();
};
const onSaveButtonClick = e => {
  const targetNode = e.target;

  saveYoutubeId(targetNode);
  hideSaveButton(targetNode);
  renderingUtils.renderSavedYoutubeNumber();
};

$searchBtn.addEventListener('click', onSearchBtnClick);
$searchInput.addEventListener('keypress', onSearchInputKeypress);
$videoWrapper.addEventListener('click', onSaveButtonClick);
const searchModalIo = new IntersectionObserver(([{ isIntersecting }]) =>
  renderingUtils.renderMoreYoutubeCards(
    isIntersecting,
    isFirstPage,
    searchYoutube
  )
);
searchModalIo.observe(
  createObservedTarget($modalInner, '검색한 결과가 없습니다ㅜㅜ')
);
