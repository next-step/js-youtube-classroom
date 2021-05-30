import getSearchedData from '../api/youtubeAPI';
import { fetchData, getSearchedYoutubeCardTemplate } from '../utils';

const $searchBtn = document.querySelector('.modal form .btn');
const $searchInput = document.querySelector('.modal .pl-2');
const $videoWrapper = document.querySelector('.modal .video-wrapper');

const searhYoutube = async () => {
  const { value } = $searchInput;
  const response = await getSearchedData(value);
  const searchedItems = response.data.items;

  fetchData($videoWrapper, searchedItems, getSearchedYoutubeCardTemplate);
};

const onSearchBtnClick = () => searhYoutube();
const onSearchInputKeydown = e => {
  if (e.key !== 'Enter') return;
  e.preventDefault();
  searhYoutube();
};

$searchBtn.addEventListener('click', onSearchBtnClick);
$searchInput.addEventListener('keydown', onSearchInputKeydown);
