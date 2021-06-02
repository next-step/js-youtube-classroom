import {
  initializeValue,
  initializeElementInner
} from 'utils/initializingUtils';
import {
  renderNoResult,
  renderYoutubeCards,
  renderMoreYoutubeCards,
  renderSavedYoutubeNumber,
  renderLatestSearchedYoutubeChip
} from 'utils/renderingUtils';
import {
  getNoResultTemplate,
  getSavedYoutubeCardTemplate,
  getSearchedYoutubeCardTemplate
} from 'utils/templateUtils';
import { showSkeleton, hideSkeleton } from 'utils/skeletonUtils';
import getSearchedData from 'api/getSearchedData';
import { setData } from 'utils/localStorageUtils';
import { state, lecturePageInfo } from 'utils/state';

const $searchBtn = document.querySelector('.modal form .btn');
const $searchInput = document.querySelector('.modal .pl-2');
const $modalInner = document.querySelector('.modal-inner');
const $searchModalVideoWrapper = document.querySelector(
  '.modal .video-wrapper'
);

// functions
const hideSaveButton = targetNode => {
  initializeElementInner(targetNode.parentNode);
};

const saveYoutube = targetNode => {
  const isSavedYoutubesFull = state.savedYoutubes.length === 100;

  if (targetNode.tagName !== 'BUTTON') return;
  if (isSavedYoutubesFull) {
    // eslint-disable-next-line no-alert
    alert(
      '저장 공간이 꽉 찼어요ㅜㅜ 기존의 동영상을 지우고 다시 저장해주세요😃'
    );
    return;
  }

  const youtubeId = targetNode.closest('article').id;
  const youtubeData = {
    ...state.renderedYoutubes.find(
      ({ id: { videoId } }) => videoId === youtubeId
    ),
    isWatched: false,
    isLiked: false
  };

  state.savedYoutubes.push(youtubeData);
  state.savedYoutubeIds.push(youtubeId);
  lecturePageInfo.notWatched.videos.push(youtubeData);

  setData('savedYoutubes', state.savedYoutubes);
  setData('savedYoutubeIds', state.savedYoutubeIds);

  return youtubeData;
};

const saveSeachedValue = value => {
  const isLatestSearchedValuesFull =
    state.savedLatestSearchedValues.length === 3;
  const searchedBeforeValue = state.savedLatestSearchedValues.find(
    _value => _value === value
  );
  const isSearchedBefore = !!searchedBeforeValue;

  if (isSearchedBefore) {
    const searchedBeforeValueIndex =
      state.savedLatestSearchedValues.indexOf(searchedBeforeValue);
    state.savedLatestSearchedValues.splice(searchedBeforeValueIndex, 1);
  }
  if (isLatestSearchedValuesFull && !isSearchedBefore)
    state.savedLatestSearchedValues.pop();

  state.savedLatestSearchedValues.unshift(value);

  setData('latestSearchedValues', state.savedLatestSearchedValues);
};

const setSearchModal = newValue => {
  state.searchedValue = newValue;

  if (!newValue) return;

  initializeElementInner($searchModalVideoWrapper);
  state.isSearchModalFirstPage = true;
};

const searchYoutube = (() => {
  let nextPageToken = '';

  const SHOWED_RESULTS_NUMBER = 10;

  return async () => {
    if (!state.searchedValue) return;

    showSkeleton($searchModalVideoWrapper, SHOWED_RESULTS_NUMBER);

    const { data } = await getSearchedData(
      state.searchedValue,
      SHOWED_RESULTS_NUMBER,
      nextPageToken
    );
    const datas = data.items;
    const hasData = !!datas.length;

    if (!hasData)
      renderNoResult(
        $searchModalVideoWrapper,
        getNoResultTemplate,
        '검색 결과가 없어요ㅜㅜ 다시 검색해 주세요'
      );
    else {
      state.renderedYoutubes = [...state.renderedYoutubes, ...datas];
      hideSkeleton($searchModalVideoWrapper);
      renderYoutubeCards(
        $searchModalVideoWrapper,
        datas,
        getSearchedYoutubeCardTemplate
      );
      state.isSearchModalFirstPage && setData('prevYoutubeDatas', datas);

      state.isSearchModalFirstPage = false;
      nextPageToken = data.nextPageToken;
    }
  };
})();

const createObservedTarget = node => {
  const $observedTarget = document.createElement('div');
  $observedTarget.classList.add('observed-target');
  node.appendChild($observedTarget);

  return $observedTarget;
};

// handlers
const onSearchBtnClick = () => {
  const value = document.querySelector('.modal form input');

  setSearchModal(value);
  searchYoutube();
  saveSeachedValue(value);
  renderLatestSearchedYoutubeChip(state.savedLatestSearchedValues);

  state.isAfterSearching = true;
};

const onSearchInputKeypress = e => {
  if (e.key !== 'Enter') return;

  const { value } = e.target;

  e.preventDefault();
  setSearchModal(value);
  searchYoutube();
  saveSeachedValue(value);
  renderLatestSearchedYoutubeChip(state.savedLatestSearchedValues);

  state.isAfterSearching = true;
};

const onSaveButtonClick = e => {
  const targetNode = e.target;
  const $lectureRoomVideoWrapper = document.querySelector(
    'main .video-wrapper'
  );

  if (e.target.tagName !== 'BUTTON') return;
  if (!state.savedYoutubeIds.length)
    initializeElementInner($lectureRoomVideoWrapper);

  const newSavedYoutubeData = saveYoutube(targetNode);

  hideSaveButton(targetNode);
  renderSavedYoutubeNumber();
  lecturePageInfo.currentPage === 'notWatched' &&
    renderYoutubeCards(
      $lectureRoomVideoWrapper,
      [newSavedYoutubeData],
      getSavedYoutubeCardTemplate
    );
};

const onInitializeSearchInput = e => {
  if (!state.isAfterSearching) return;
  initializeValue(e.target);
  state.isAfterSearching = false;
};

$searchBtn.addEventListener('click', onSearchBtnClick);
$searchInput.addEventListener('keypress', onSearchInputKeypress);
$searchInput.addEventListener('click', onInitializeSearchInput);
$searchInput.addEventListener('keydown', onInitializeSearchInput);
$searchModalVideoWrapper.addEventListener('click', onSaveButtonClick);
const searchModalIo = new IntersectionObserver(([{ isIntersecting }]) =>
  renderMoreYoutubeCards(
    isIntersecting,
    state.isSearchModalFirstPage,
    searchYoutube
  )
);
searchModalIo.observe(
  createObservedTarget($modalInner, '검색한 결과가 없습니다ㅜㅜ')
);
