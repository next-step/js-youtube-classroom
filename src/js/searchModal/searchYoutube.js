import getSearchedData from 'api/getSearchedData';
import {
  renderingUtils,
  templateUtils,
  skeletonUtils,
  createObservedTarget
} from 'utils';
import state from './state';

const $searchBtn = document.querySelector('.modal form .btn');
const $searchInput = document.querySelector('.modal .pl-2');
const $videoWrapper = document.querySelector('.modal .video-wrapper');
const $modalInner = document.querySelector('.modal-inner');

let isFirstPage = true;
let savedLatestSearchedValues = [];
const savedYoutubeIds = [];

// functions
const hideSaveButton = targetNode => {
  targetNode.parentNode.innerHTML = '';
};

const saveYoutubeId = targetNode => {
  const isSavedYoutubeIdsFull = savedYoutubeIds.length === 100;

  if (targetNode.tagName !== 'BUTTON' || isSavedYoutubeIdsFull) return;

  const youtubeId = targetNode.closest('article').id;

  savedYoutubeIds.push(youtubeId);
  localStorage.setItem('savedYoutubeIds', JSON.stringify(savedYoutubeIds));
};

const saveSeachedValue = () => {
  const { value } = $searchInput;
  const localData = localStorage.getItem('latestSearchedValues');
  savedLatestSearchedValues = localData ? JSON.parse(localData) : [];

  const isLatestSearchedValuesFull = savedLatestSearchedValues.length === 3;
  isLatestSearchedValuesFull && savedLatestSearchedValues.pop();

  savedLatestSearchedValues.unshift(value);

  localStorage.setItem(
    'latestSearchedValues',
    JSON.stringify(savedLatestSearchedValues)
  );
};

const setSearchModal = () => {
  const newValue = $searchInput.value;

  state.searchedValue = newValue;

  if (newValue) {
    $videoWrapper.innerHTML = '';
    isFirstPage = true;
  }
};

const searchYoutube = (() => {
  let nextPageToken = '';
  const SHOWED_RESULTS_NUMBER = 10;

  const saveCurrentResultDatas = datas => {
    localStorage.setItem('prevYoutubeDatas', JSON.stringify(datas));
  };

  return async () => {
    if (!state.searchedValue) return;

    skeletonUtils.showSkeleton($videoWrapper, SHOWED_RESULTS_NUMBER);

    const { data } = await getSearchedData(
      state.searchedValue,
      SHOWED_RESULTS_NUMBER,
      nextPageToken
    );
    const datas = data.items;
    const hasData = !!datas.length;

    if (!hasData)
      renderingUtils.renderNoResult(
        $videoWrapper,
        '검색 결과가 없어요ㅜㅜ 다시 검색해 주세요'
      );
    else {
      skeletonUtils.hideSkeleton($videoWrapper);
      renderingUtils.renderYoutubeCards(
        $videoWrapper,
        datas,
        templateUtils.getSearchedYoutubeCardTemplate
      );
      isFirstPage && saveCurrentResultDatas(datas);

      isFirstPage = false;
      nextPageToken = data.nextPageToken;
    }
  };
})();

// handlers
const onSearchBtnClick = () => {
  setSearchModal();
  searchYoutube();
  saveSeachedValue();
  renderingUtils.renderLatestSearchedYoutubeChip(savedLatestSearchedValues);
};

const onSearchInputKeypress = e => {
  if (e.key !== 'Enter') return;
  e.preventDefault();
  setSearchModal();
  searchYoutube();
  saveSeachedValue();
  renderingUtils.renderLatestSearchedYoutubeChip(savedLatestSearchedValues);
};

const onSaveButtonClick = e => {
  const targetNode = e.target;

  saveYoutubeId(targetNode);
  hideSaveButton(targetNode);
  renderingUtils.renderSavedYoutubeNumber();
};

// watch interection
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
