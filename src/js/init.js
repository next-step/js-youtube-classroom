import {
  renderChips,
  renderNoResult,
  renderNotWatchedItems,
} from 'utils/render';

// 최근 검색어 보여주기
renderChips(JSON.parse(localStorage.getItem('lastestSearches')));

// 볼영상들 처음 화면에 들어왔을때 보여주기
const $mainVideoWrapper = document.querySelector('main .video-wrapper');
const savedVideos = JSON.parse(localStorage.getItem('savedItems'));

savedVideos
  ? renderNotWatchedItems(savedVideos, $mainVideoWrapper)
  : renderNoResult($mainVideoWrapper);
