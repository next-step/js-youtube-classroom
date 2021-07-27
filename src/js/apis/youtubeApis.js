import {YOUTUBE_API_KEY} from './secretKey.js';
import {dateToLocaleString} from '../utils/date.js';

const YOUTUBE_API_DOMAIN = 'https://www.googleapis.com';

export const findAllBySearchKey = async ({searchKeyword, pageToken = '', maxSize = 10}) => {
    const res = await fetch(`${YOUTUBE_API_DOMAIN}/youtube/v3/search?key=${YOUTUBE_API_KEY}&part=snippet&order=viewCount&maxResults=${maxSize}&pageToken=${pageToken}&q=${searchKeyword}`);
    const {nextPageToken, items} = await res.json();

    return {
        nextPageToken,
        items: items.map(item => {
            const {id: {videoId}, snippet: {channelId, channelTitle, title, publishedAt}} = item;

            return {
                videoId,
                channelId,
                channelTitle,
                title,
                publishedAt: dateToLocaleString(publishedAt),
            };
        }),
    };
};

export const findAllByVideoIds = async ({videoIds}) => {
    const res = await fetch(`${YOUTUBE_API_DOMAIN}/youtube/v3/videos?key=${YOUTUBE_API_KEY}&part=snippet&id=${videoIds.join(',')}`);
    const {items} = await res.json();

    return {
        items: items.map(item => {
            const {id: videoId, snippet: {channelId, channelTitle, title, publishedAt}} = item;

            return {
                videoId,
                channelId,
                channelTitle,
                title,
                publishedAt: dateToLocaleString(publishedAt),
            };
        }),
    };
};
