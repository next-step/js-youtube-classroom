import {API_KEY} from './constants/API_KEY.js';
import {FETCH_VIDEO_COUNT, SEARCH_URL} from './constants/classroom.js';

export const searchResult = async (keyword, nextPageToken = '') => {
    const query = `part=snippet&order=viewCount&maxResults=${FETCH_VIDEO_COUNT}&pageToken=${nextPageToken}&q=${keyword}&key=${API_KEY}`;

    return fetch(`${SEARCH_URL}?${query}`)
        .then((data) => data.json())
        .catch((e) => console.error(e));
};
