import { iterate } from 'utils/iterate';
import { renderYoutubeItems, refreshItems } from 'utils/render';
import fetchVideoId from 'utils/fetchVideoId';

const $mainVideoWrapper = document.querySelector('main .video-wrapper');

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

  refreshItems($mainVideoWrapper);

  iterate(renderYoutubeItems, stateChangedItems, {
    node: $mainVideoWrapper,
    youtubeItemType: 'lecture',
  });
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

  refreshItems($mainVideoWrapper);

  iterate(renderYoutubeItems, notDeletedItems, {
    node: $mainVideoWrapper,
    youtubeItemType: 'lecture',
  });
};

$mainVideoWrapper.addEventListener('click', onClickWatched);
$mainVideoWrapper.addEventListener('click', onClickDelete);
