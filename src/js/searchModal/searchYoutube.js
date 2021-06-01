import api from 'apis/api';
import {
  renderYoutubeItems,
  renderNotFoundMessage,
  renderSkeleton,
  hideSkeleton,
  refreshItems,
  renderChips,
} from 'utils/render';

const $modalVideoWrapper = document.querySelector('.modal .video-wrapper');
const $searchInput = document.querySelector('.modal form .w-100');
const $searchForm = document.querySelector('.modal form');
const $modalInner = document.querySelector('.modal-inner');
const $savedCount = document.querySelector('.saved-count');
const $div = document.createElement('div');
$div.setAttribute('id', 'modalFetchMore');

const searchInfo = { nextPage: '', value: '', items: [] };
const initialSavedItems = JSON.parse(localStorage.getItem('savedItems'));
let savedItems = [];
let isSaved = false;
let savedCount = initialSavedItems ? initialSavedItems.length : 0;
let chips = JSON.parse(localStorage.getItem('lastestSearches')) || [];

$savedCount.innerText = initialSavedItems ? initialSavedItems.length : '0';

const checkWhetherSaved = items => {
  const localSavedItems = JSON.parse(localStorage.getItem('savedItems'));

  if (localSavedItems)
    items.forEach(item => {
      const {
        id: { videoId },
      } = item;
      localSavedItems.forEach(localSavedItem => {
        const {
          id: { videoId: localVideoId },
        } = localSavedItem;

        if (videoId === localVideoId) isSaved = true;
      });
      renderYoutubeItems($modalVideoWrapper, item, isSaved);
      isSaved = false;
    });
  else {
    items.forEach(item =>
      renderYoutubeItems($modalVideoWrapper, item, isSaved)
    );
  }
};

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
    : checkWhetherSaved(items);

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
  checkWhetherSaved(items);
};

const onSearch = e => {
  e.preventDefault();
  search();
  addChip(searchInfo.value);
  renderChips(chips);
};

const onClickSave = e => {
  const localSavedItems = JSON.parse(localStorage.getItem('savedItems'));

  if (localSavedItems && localSavedItems.length >= 100) return;
  if (!e.target.matches('.video-wrapper button')) return;

  const $clip = e.target.closest('.clip');
  const $iframe = $clip.querySelector('iframe');
  const iframeUrlSplit = $iframe.getAttribute('src').split('/');
  const clickedVideoId = iframeUrlSplit[iframeUrlSplit.length - 1];
  const clickedVideo = searchInfo.items.find(
    ({ id: { videoId } }) => videoId === clickedVideoId
  );

  if (localStorage.getItem('savedItems')) {
    savedItems = JSON.parse(localStorage.getItem('savedItems'));
  }
  savedItems = [...savedItems, clickedVideo];

  localStorage.setItem('savedItems', JSON.stringify(savedItems));
  savedCount++;

  $savedCount.innerText = savedCount;
  e.target.setAttribute('disabled', true);
};

const fetchMoreObserver = new IntersectionObserver(([{ isIntersecting }]) => {
  if (isIntersecting) searchNextPage(searchInfo.value, searchInfo.nextPage);
});

fetchMoreObserver.observe($div);

$searchForm.addEventListener('submit', onSearch);
$modalVideoWrapper.addEventListener('click', onClickSave);
