import getSearchedData from 'api/youtubeAPI';
import { renderYoutubeCards, template, showSkeleton } from 'utils';

const $searchBtn = document.querySelector('.modal form .btn');
const $searchInput = document.querySelector('.modal .pl-2');
const $videoWrapper = document.querySelector('.modal .video-wrapper');

const SKELETON_NUMBER = 10;

const showNoResult = () => {
  $videoWrapper.innerHTML = template.getNoResultTemplate();
};

const searhYoutube = async () => {
  showSkeleton($videoWrapper, SKELETON_NUMBER);

  const { value } = $searchInput;
  const response = await getSearchedData(value);
  const searchedItems = response.data.items;
  const isNoResult = !searchedItems.length;

  if (isNoResult) showNoResult();
  else
    renderYoutubeCards(
      $videoWrapper,
      searchedItems,
      template.getSearchedYoutubeCardTemplate
    );
};

const onSearchBtnClick = () => searhYoutube();
const onSearchInputKeydown = e => {
  if (e.key !== 'Enter') return;
  e.preventDefault();
  searhYoutube();
};

$searchBtn.addEventListener('click', onSearchBtnClick);
$searchInput.addEventListener('keydown', onSearchInputKeydown);
