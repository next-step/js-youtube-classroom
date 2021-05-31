import api from 'apis/api';
import {
  renderYoutubeItems,
  renderNotFoundMessage,
  renderSkeleton,
} from 'utils/render';

const $modalVideoWrapper = document.querySelector('.modal .video-wrapper');
const $searchInput = document.querySelector('.modal form .w-100');
const $searchButton = document.querySelector('.modal form .btn');
const $modalInner = document.querySelector('.modal-inner');
const $div = document.createElement('div');
$div.setAttribute('id', 'modalFetchMore');

const searchInfo = { nextPage: '', value: '' };

const search = async () => {
  const { value } = $searchInput;
  searchInfo.value = value;

  renderSkeleton($modalVideoWrapper, 10);

  const response = await api.searchYoutube(value);
  const {
    data: { items, nextPageToken },
  } = response;
  const isNotFound = !items.length;
  searchInfo.nextPage = nextPageToken;

  isNotFound
    ? renderNotFoundMessage($modalVideoWrapper)
    : renderYoutubeItems($modalVideoWrapper, items);

  $modalInner.appendChild($div);
};

const searchNextPage = async (value, pageToken) => {
  const response = await api.searchNextPageYoutube(value, pageToken);
  const {
    data: { items, nextPageToken },
  } = response;
  searchInfo.nextPage = nextPageToken;

  renderYoutubeItems($modalVideoWrapper, items);
};

const onEnterSearch = e => {
  if (e.key === 'Enter') {
    e.preventDefault();
    search();
  }
};

const onClickSearch = () => {
  search();
};

const fetchMoreObserver = new IntersectionObserver(([{ isIntersecting }]) => {
  if (isIntersecting) searchNextPage(searchInfo.value, searchInfo.nextPage);
});

fetchMoreObserver.observe($div);

$searchInput.addEventListener('keypress', onEnterSearch);
$searchButton.addEventListener('click', onClickSearch);
