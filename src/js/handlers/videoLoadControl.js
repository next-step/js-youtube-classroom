import {$} from '../utils/DOM.js';
import {searchResult} from '../API.js';
import {LATEST_KEYWORD} from '../constants/localStorage.js';
import {getLocalStorage} from '../utils/localStorage.js';
import {pageToken} from '../states/pageToken.js';
import {createSearchedVideoList} from '../templates/searchedVideoList.js';

export async function moreVideoLoadController(entries) {
    const [$lastVideo] = entries;
    const intersectionObserver = this;

    if (!$lastVideo.isIntersecting) return;

    intersectionObserver.disconnect();

    const keyword = getLocalStorage(LATEST_KEYWORD);
    const {nextPageToken, items} = await searchResult(keyword, pageToken.get());

    pageToken.set(nextPageToken);
    createSearchedVideoList(items);

    const $newLastVideo = $('#video-search-result .js-video:last-child');
    intersectionObserver.observe($newLastVideo);
}
