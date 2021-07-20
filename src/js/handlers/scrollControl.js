import {$} from '../utils/DOM.js';
import {intersectionObserver} from '../utils/intersectionObserver.js';

export const initInfiniteScroll = () => {
    const $lastVideo = $('#video-search-result .js-video:last-child');

    intersectionObserver.disconnect();
    intersectionObserver.observe($lastVideo);
};
