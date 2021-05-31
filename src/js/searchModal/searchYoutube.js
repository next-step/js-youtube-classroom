import getSearchedData from 'api/getSearchedData';
import { renderYoutubeCards, template, skeleton } from 'utils';

const $searchBtn = document.querySelector('.modal form .btn');
const $searchInput = document.querySelector('.modal .pl-2');
const $videoWrapper = document.querySelector('.modal .video-wrapper');

let isFirstPage = true;

const showNoResult = () => {
  $videoWrapper.innerHTML = template.getNoResultTemplate();
};
const initializeSearchModal = () => {
  isFirstPage = true;
  $videoWrapper.innerHTML = '';
};
const searhYoutube = (() => {
  const SHOWED_RESULTS_NUMBER = 10;

  let nextPageToken = '';
  let searchedValue = '';

  const getSearchedValue = newSearchedValue => {
    const isNewSearch = newSearchedValue !== searchedValue;

    if (!isNewSearch) {
      return searchedValue;
    }

    searchedValue = newSearchedValue;
    initializeSearchModal();
    return newSearchedValue;
  };
  const renderResult = response => {
    const searchedItems = response.data.items;
    const isNoResult = !searchedItems.length;

    if (isNoResult) showNoResult();
    else {
      skeleton.hideSkeleton($videoWrapper);
      renderYoutubeCards(
        $videoWrapper,
        searchedItems,
        template.getSearchedYoutubeCardTemplate
      );

      nextPageToken = response.data.nextPageToken;
      isFirstPage = false;
    }
  };

  return async () => {
    const searchedValue = getSearchedValue($searchInput.value);

    skeleton.showSkeleton($videoWrapper, SHOWED_RESULTS_NUMBER);

    const response = await getSearchedData(
      searchedValue,
      SHOWED_RESULTS_NUMBER,
      nextPageToken
    );
    renderResult(response);
  };
})();
const createObservedTarget = () => {
  const $modalInner = document.querySelector('.modal-inner');
  const $observedTarget = document.createElement('div');
  $observedTarget.classList.add('observed-target');
  $modalInner.appendChild($observedTarget);

  return $observedTarget;
};
const renderMoreYoutubeCards = () => {
  const io = new IntersectionObserver(([{ isIntersecting }]) => {
    if (!isIntersecting) return;
    if (!isFirstPage) searhYoutube();
  });
  io.observe(createObservedTarget());
};

const onSearchBtnClick = () => {
  searhYoutube();
};
const onSearchInputKeypress = e => {
  if (e.key !== 'Enter') return;
  e.preventDefault();
  searhYoutube();
};

$searchBtn.addEventListener('click', onSearchBtnClick);
$searchInput.addEventListener('keypress', onSearchInputKeypress);
renderMoreYoutubeCards();
