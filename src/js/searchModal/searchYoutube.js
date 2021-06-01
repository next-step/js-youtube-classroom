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
const $searchModalVideoWrapper = document.querySelector(
  '.modal .video-wrapper'
);
const $modalInner = document.querySelector('.modal-inner');

// functions
const hideSaveButton = targetNode => {
  targetNode.parentNode.innerHTML = '';
};

const saveYoutube = targetNode => {
  const isSavedYoutubesFull = state.savedYoutubes.length === 100;

  if (targetNode.tagName !== 'BUTTON' || isSavedYoutubesFull) return;

  const youtubeId = targetNode.closest('article').id;
  const youtubeData = state.renderedYoutubes.find(
    ({ id: { videoId } }) => videoId === youtubeId
  );

  state.savedYoutubes.push(youtubeData);
  state.savedYoutubeIds.push(youtubeId);

  localStorage.setItem('savedYoutubes', JSON.stringify(state.savedYoutubes));
  localStorage.setItem(
    'savedYoutubeIds',
    JSON.stringify(state.savedYoutubeIds)
  );

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

  localStorage.setItem(
    'latestSearchedValues',
    JSON.stringify(state.savedLatestSearchedValues)
  );
};

const setSearchModal = newValue => {
  state.searchedValue = newValue;

  if (newValue) {
    $searchModalVideoWrapper.innerHTML = '';
    state.isSearchModalFirstPage = true;
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

    skeletonUtils.showSkeleton($searchModalVideoWrapper, SHOWED_RESULTS_NUMBER);

    const { data } = await getSearchedData(
      state.searchedValue,
      SHOWED_RESULTS_NUMBER,
      nextPageToken
    );
    const datas = data.items;
    const hasData = !!datas.length;

    if (!hasData)
      renderingUtils.renderNoResult(
        $searchModalVideoWrapper,
        templateUtils.getNoResultTemplate,
        '검색 결과가 없어요ㅜㅜ 다시 검색해 주세요'
      );
    else {
      skeletonUtils.hideSkeleton($searchModalVideoWrapper);
      renderingUtils.renderYoutubeCards(
        $searchModalVideoWrapper,
        datas,
        templateUtils.getSearchedYoutubeCardTemplate
      );
      state.isSearchModalFirstPage && saveCurrentResultDatas(datas);

      state.isSearchModalFirstPage = false;
      nextPageToken = data.nextPageToken;
      state.renderedYoutubes = [...datas];
    }
  };
})();

// handlers
const onSearchBtnClick = () => {
  const value = document.querySelector('.modal form input');
  setSearchModal(value);
  searchYoutube();
  saveSeachedValue(value);
  renderingUtils.renderLatestSearchedYoutubeChip(
    state.savedLatestSearchedValues
  );
  state.isAfterSearching = true;
};

const onSearchInputKeypress = e => {
  if (e.key !== 'Enter') return;
  const { value } = e.target;
  e.preventDefault();
  setSearchModal(value);
  searchYoutube();
  saveSeachedValue(value);
  renderingUtils.renderLatestSearchedYoutubeChip(
    state.savedLatestSearchedValues
  );
  state.isAfterSearching = true;
};

const onSaveButtonClick = e => {
  const targetNode = e.target;
  const $lectureRoomVideoWrapper = document.querySelector(
    'main .video-wrapper'
  );

  if (!state.savedYoutubeIds.length) $lectureRoomVideoWrapper.innerHTML = '';
  const newSavedYoutubeData = saveYoutube(targetNode);
  hideSaveButton(targetNode);
  renderingUtils.renderSavedYoutubeNumber();
  renderingUtils.renderYoutubeCards(
    $lectureRoomVideoWrapper,
    [newSavedYoutubeData],
    templateUtils.getSavedYoutubeCardTemplate
  );
};

const onInitializeSearchInput = e => {
  if (!state.isAfterSearching) return;
  e.target.value = '';
  state.isAfterSearching = false;
};

// watch interection
$searchBtn.addEventListener('click', onSearchBtnClick);
$searchInput.addEventListener('keypress', onSearchInputKeypress);
$searchInput.addEventListener('click', onInitializeSearchInput);
$searchInput.addEventListener('keydown', onInitializeSearchInput);
$searchModalVideoWrapper.addEventListener('click', onSaveButtonClick);
const searchModalIo = new IntersectionObserver(([{ isIntersecting }]) =>
  renderingUtils.renderMoreYoutubeCards(
    isIntersecting,
    state.isSearchModalFirstPage,
    searchYoutube
  )
);
searchModalIo.observe(
  createObservedTarget($modalInner, '검색한 결과가 없습니다ㅜㅜ')
);
