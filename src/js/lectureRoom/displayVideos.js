import {
  refreshItems,
  renderSnackBar,
  renderNotWatchedItems,
  renderWatchedItems,
  renderLikedItems,
  renderDependsOnTabState,
} from 'utils/render';
import fetchVideoId from 'utils/fetchVideoId';
import globalState from 'utils/globalState';

const $mainVideoWrapper = document.querySelector('main .video-wrapper');
const $nav = document.querySelector('nav');

let stateChangedItems = [];
let notDeletedItems = [];

const onClickWatched = e => {
  const { target } = e;

  if (!target.matches('.watched')) return;

  const savedItems = JSON.parse(localStorage.getItem('savedItems'));
  const clickedVideoId = fetchVideoId(target);

  stateChangedItems = savedItems.map(savedItem => {
    const {
      id: { videoId },
      state: { isWatched, isLiked },
    } = savedItem;

    return videoId === clickedVideoId
      ? { ...savedItem, state: { isWatched: !isWatched, isLiked } }
      : savedItem;
  });

  localStorage.setItem('savedItems', JSON.stringify(stateChangedItems));

  renderDependsOnTabState(stateChangedItems, $mainVideoWrapper, renderSnackBar);
};

const onClickDelete = e => {
  const { target } = e;

  if (
    !target.matches('.delete') ||
    !window.confirm('이 영상을 삭제하시겠습니까?')
  )
    return;

  const savedItems = JSON.parse(localStorage.getItem('savedItems'));
  const clickedVideoId = fetchVideoId(target);

  notDeletedItems = savedItems.filter(savedItem => {
    const {
      id: { videoId },
    } = savedItem;

    return videoId !== clickedVideoId;
  });

  localStorage.setItem('savedItems', JSON.stringify(notDeletedItems));

  renderDependsOnTabState(notDeletedItems, $mainVideoWrapper);

  renderSnackBar('해당 영상이 삭제되었습니다.');
};

const onClickLiked = e => {
  const { target } = e;
  if (!target.matches('.liked')) return;

  const savedItems = JSON.parse(localStorage.getItem('savedItems'));
  const clickedVideoId = fetchVideoId(target);

  stateChangedItems = savedItems.map(savedItem => {
    const {
      id: { videoId },
      state: { isWatched, isLiked },
    } = savedItem;

    return videoId === clickedVideoId
      ? { ...savedItem, state: { isWatched, isLiked: !isLiked } }
      : savedItem;
  });

  localStorage.setItem('savedItems', JSON.stringify(stateChangedItems));

  renderDependsOnTabState(stateChangedItems, $mainVideoWrapper);
};

const onMenuChange = e => {
  const { target } = e;

  if (!target.matches('button')) return;

  const savedItems = JSON.parse(localStorage.getItem('savedItems'));
  const buttons = [...e.currentTarget.children];

  if (target.id === 'notWatched') {
    refreshItems($mainVideoWrapper);
    renderNotWatchedItems(savedItems, $mainVideoWrapper);
    globalState.tabState = 'notWatched';
  } else if (target.id === 'watched') {
    refreshItems($mainVideoWrapper);
    renderWatchedItems(savedItems, $mainVideoWrapper);
    globalState.tabState = 'watched';
  } else {
    refreshItems($mainVideoWrapper);
    renderLikedItems(savedItems, $mainVideoWrapper);
    globalState.tabState = 'liked';
  }

  buttons.forEach(button => {
    button.classList.toggle('bg-cyan-100', button.id === globalState.tabState);
  });
};

$mainVideoWrapper.addEventListener('click', onClickWatched);
$mainVideoWrapper.addEventListener('click', onClickDelete);
$mainVideoWrapper.addEventListener('click', onClickLiked);
$nav.addEventListener('click', onMenuChange);
