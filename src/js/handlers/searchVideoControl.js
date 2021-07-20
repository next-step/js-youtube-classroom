import {$} from '../utils/DOM.js';
import {searchResult} from '../API.js';
import {createSearchedVideoList} from '../templates/searchedVideoList.js';
import {videoSkeletonTemplate} from '../templates/videoSkeleton.js';
import {FETCH_VIDEO_COUNT} from '../constants/classroom.js';
import {LATEST_KEYWORD} from '../constants/localStorage.js';
import {searchNotFoundTemplate} from '../templates/searchNotFound.js';
import {initInfiniteScroll} from './scrollControl.js';
import {setLocalStorage} from '../utils/localStorage.js';
import {pageToken} from '../states/pageToken.js';

export const searchVideoController = async (e) => {
    e.preventDefault();

    const keyword = e.target.elements['video-search-input'].value;
    setLocalStorage(LATEST_KEYWORD, keyword);

    const items = await searchVideo(keyword);
    if (!items.length) return;
    initInfiniteScroll();
};

export const searchVideo = async (keyword) => {
    $('#video-search-result').innerHTML = videoSkeletonTemplate().repeat(FETCH_VIDEO_COUNT);

    const {nextPageToken, items} = await searchResult(keyword);

    pageToken.set(nextPageToken);
    $('#video-search-result').innerHTML = '';

    items.length ? createSearchedVideoList(items) : ($videoSearchResult.innerHTML = searchNotFoundTemplate());

    return items;
};
