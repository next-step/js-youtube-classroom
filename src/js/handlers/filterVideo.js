import {videoInfos} from '../states/videoInfo.js';
import {renderSavedVideo} from '../utils/render.js';

export const filterVideoController = ({target}) => {
    if (!['toWatch', 'watched', 'liked'].includes(target.id)) return;
    const option = target.id;
    loadVideo(option);
};

export const loadVideo = (option = 'toWatch') => {
    const filteredVideo = filterVideo(videoInfos.get(), option);
    renderSavedVideo(filteredVideo);
};

const filterVideo = (videos, option) => {
    const filter = {
        toWatch: () => videos.filter(({type}) => !type.isWatched),
        watched: () => videos.filter(({type}) => type.isWatched),
        liked: () => videos.filter(({type}) => type.isLiked),
    };

    return filter[option]();
};
