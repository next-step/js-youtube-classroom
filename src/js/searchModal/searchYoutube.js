import api from 'apis/api';
import showSkeleton from 'utils/skeleton';
import renderSearchedItems from 'utils/render';

const $modalVideoWrapper = document.querySelector('.modal .video-wrapper');
const $searchInput = document.querySelector('.modal form .w-100');
const $searchButton = document.querySelector('.modal form .btn');

const search = async () => {
  const { value } = $searchInput;

  showSkeleton($modalVideoWrapper, 10);

  const response = await api.searchYoutube(value);
  const {
    data: { items },
  } = response;

  renderSearchedItems($modalVideoWrapper, items);
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

$searchInput.addEventListener('keydown', onEnterSearch);
$searchButton.addEventListener('click', onClickSearch);
