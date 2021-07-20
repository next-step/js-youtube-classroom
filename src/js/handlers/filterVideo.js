import {$, $$} from '../utils/DOM.js';
import {videoInfos} from '../states/videoInfo.js';
import {renderEmptyVideo, renderSavedVideo} from '../utils/render.js';

export const filterVideoController = ({target}) => {
    if (!['toWatch', 'watched', 'liked'].includes(target.id)) return;
    const option = target.id;
    buttonController(option);
    loadVideo(option);
};

const buttonController = (option) => {
    const buttons = $$('#video-filter button');
    buttons.forEach((button) => button.classList.remove('bg-cyan-100'));
    $(`#${option}`).classList.add('bg-cyan-100');
};

export const loadVideo = (option = 'toWatch') => {
    const filteredVideo = filterVideo(videoInfos.get(), option);
    if (!filteredVideo.length) renderEmptyVideo();
    else renderSavedVideo(filteredVideo);
};

const filterVideo = (videos, option) => {
    const filter = {
        toWatch: () => videos.filter(({type}) => !type.isWatched),
        watched: () => videos.filter(({type}) => type.isWatched),
        liked: () => videos.filter(({type}) => type.isLiked),
    };

    return filter[option]();
};
