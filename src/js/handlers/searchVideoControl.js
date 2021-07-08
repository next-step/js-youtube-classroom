import {$} from '../utils/DOM.js';
import {searchResult} from '../API.js';
import {createSearchedVideoList} from '../templates/searchedVideoList.js';
import {videoSkeletonTemplate} from '../templates/videoSkeleton.js';
import {FETCH_VIDEO_COUNT} from '../constants/classroom.js';
import {searchNotFoundTemplate} from '../templates/searchNotFound.js';

export const onSearchVideo = async (e) => {
    e.preventDefault();

    const $videoSearchResult = $('#video-search-result');
    const keyword = e.target.elements['video-search-input'].value;

    $videoSearchResult.innerHTML = videoSkeletonTemplate().repeat(FETCH_VIDEO_COUNT);

    const {nextPageToken, items} = await searchResult(keyword);
    $videoSearchResult.innerHTML = '';

    if (items.length === 0) $videoSearchResult.innerHTML = searchNotFoundTemplate();
    createSearchedVideoList(items);
};
