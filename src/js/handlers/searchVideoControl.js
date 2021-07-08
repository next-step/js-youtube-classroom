import {searchResult} from '../API.js';
import {createSearchedVideoList} from '../templates/searchedVideoList.js';

export const onSearchVideo = async (e) => {
    e.preventDefault();

    const keyword = e.target.elements['video-search-input'].value;
    const {nextPageToken, items} = await searchResult(keyword);
    createSearchedVideoList(items);
};
