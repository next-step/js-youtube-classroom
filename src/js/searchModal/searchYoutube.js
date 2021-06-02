import api from 'apis/api';
import {
  renderYoutubeItems,
  renderNotFoundMessage,
  renderSkeleton,
  hideSkeleton,
  refreshItems,
  renderChips,
  renderSnackBar,
} from 'utils/render';
import { iterateWithIsSavedState, iterate } from 'utils/iterate';
import fetchVideoId from 'utils/fetchVideoId';

const $modalVideoWrapper = document.querySelector('.modal .video-wrapper');
const $searchInput = document.querySelector('.modal form .w-100');
const $searchForm = document.querySelector('.modal form');
const $modalInner = document.querySelector('.modal-inner');
const $savedCount = document.querySelector('.saved-count');
const $mainVideoWrapper = document.querySelector('main .video-wrapper');
const $div = document.createElement('div');
$div.setAttribute('id', 'modalFetchMore');

const searchInfo = { nextPage: '', value: '', items: [] };
const initialSavedItems = JSON.parse(localStorage.getItem('savedItems'));
let savedItems = [];
let savedCount = initialSavedItems ? initialSavedItems.length : 0;
let chips = JSON.parse(localStorage.getItem('lastestSearches')) || [];

$savedCount.innerText = initialSavedItems ? initialSavedItems.length : '0';

const checkIfDuplicates = (value, cond) => {
  if (chips.includes(value)) {
    chips.splice(chips.indexOf(value), 1);
    chips = [...chips, value];
    localStorage.setItem('lastestSearches', JSON.stringify(chips));
  } else {
    cond && chips.shift();
    chips = [...chips, value];
    localStorage.setItem('lastestSearches', JSON.stringify(chips));
  }
};

const addChip = value => {
  if (chips && chips.length >= 3) {
    checkIfDuplicates(value, chips.length >= 3);
    return;
  }

  checkIfDuplicates(value);
};

const search = async () => {
  const { value } = $searchInput;

  if (searchInfo.value !== value) refreshItems($modalVideoWrapper);

  searchInfo.value = value;

  renderSkeleton($modalVideoWrapper, 10);

  const response = await api.searchYoutube(value);
  const {
    data: { items, nextPageToken },
  } = response;
  const isNotFound = !items.length;
  searchInfo.items = items;
  searchInfo.nextPage = nextPageToken;

  hideSkeleton($modalVideoWrapper);

  isNotFound
    ? renderNotFoundMessage($modalVideoWrapper)
    : iterateWithIsSavedState(renderYoutubeItems, items, {
        node: $modalVideoWrapper,
        youtubeItemType: 'search',
      });

  $modalInner.appendChild($div);
};

const searchNextPage = async (value, pageToken) => {
  renderSkeleton($modalVideoWrapper, 10);

  const response = await api.searchNextPageYoutube(value, pageToken);
  const {
    data: { items, nextPageToken },
  } = response;
  searchInfo.nextPage = nextPageToken;
  searchInfo.items = [...searchInfo.items, ...items];

  hideSkeleton($modalVideoWrapper);

  iterateWithIsSavedState(renderYoutubeItems, items, {
    node: $modalVideoWrapper,
    youtubeItemType: 'search',
  });
};

const onSearch = e => {
  e.preventDefault();
  search();
  addChip(searchInfo.value);
  renderChips(chips);
};

const onClickSave = e => {
  const { target } = e;
  const localSavedItems = JSON.parse(localStorage.getItem('savedItems'));

  if (
    (localSavedItems && localSavedItems.length >= 100) ||
    !target.matches('.video-wrapper button')
  )
    return;

  const clickedVideoId = fetchVideoId(target);
  const clickedVideo = searchInfo.items.find(
    ({ id: { videoId } }) => videoId === clickedVideoId
  );

  savedItems = localSavedItems
    ? [
        ...localSavedItems,
        { ...clickedVideo, state: { isWatched: false, isLiked: false } },
      ]
    : [
        ...savedItems,
        { ...clickedVideo, state: { isWatched: false, isLiked: false } },
      ];

  localStorage.setItem('savedItems', JSON.stringify(savedItems));
  savedCount++;

  $savedCount.innerText = savedCount;
  target.setAttribute('disabled', true);

  refreshItems($mainVideoWrapper);

  iterate(renderYoutubeItems, savedItems, {
    node: $mainVideoWrapper,
    youtubeItemType: 'lecture',
  });

  renderSnackBar('나중에 볼 영상으로 저장되었습니다!');
};

const fetchMoreObserver = new IntersectionObserver(([{ isIntersecting }]) => {
  if (isIntersecting) searchNextPage(searchInfo.value, searchInfo.nextPage);
});

fetchMoreObserver.observe($div);

$searchForm.addEventListener('submit', onSearch);
$modalVideoWrapper.addEventListener('click', onClickSave);
