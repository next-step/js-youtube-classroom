import { renderChips, renderNoResult, renderYoutubeItems } from 'utils/render';
import { iterate } from 'utils/iterate';

const $mainVideoWrapper = document.querySelector('main .video-wrapper');

const savedVideos = JSON.parse(localStorage.getItem('savedItems'));

renderChips(JSON.parse(localStorage.getItem('lastestSearches')));

savedVideos
  ? iterate(renderYoutubeItems, savedVideos, {
      node: $mainVideoWrapper,
      youtubeItemType: 'lecture',
    })
  : renderNoResult($mainVideoWrapper);
