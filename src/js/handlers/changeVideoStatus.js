import {DELETE_CONFIRM_NSG} from '../constants/message.js';
import {videoInfos} from '../states/videoInfo.js';

export const changeVideoStatus = ({target}) => {
    const option = target.id;
    if (!['watched', 'liked', 'delete'].includes(option)) return;
    changeStatus(target, option);
};

const changeStatus = (target, option) => {
    const {videoId} = target.closest('.js-video').dataset;

    const status = {
        watched: () => handleWatchedButton(target),
        liked: () => handleLikedButton(target),
        delete: () => {
            if (confirm(DELETE_CONFIRM_NSG)) videoInfos.remove(videoId);
        },
    };

    return status[option]();
};

const handleWatchedButton = (target) => {
    if (target.classList.contains('opacity-hover')) {
        changeButton(target, 'opacity-hover', 'false');
        setVideoStatus(target, 'isWatched', true);
    } else {
        changeButton(target, 'false', 'opacity-hover');
        setVideoStatus(target, 'isWatched', false);
    }
};

const handleLikedButton = (target) => {
    if (target.classList.contains('opacity-hover')) {
        changeButton(target, 'opacity-hover', 'false');
        setVideoStatus(target, 'isLiked', true);
    } else {
        changeButton(target, 'false', 'opacity-hover');
        setVideoStatus(target, 'isLiked', false);
    }
};

const changeButton = (target, removeTarget, addTarget) => {
    target.classList.remove(removeTarget);
    target.classList.add(addTarget);
};

const setVideoStatus = (target, $type, value) => {
    const targetId = target.closest('article').dataset.videoId;
    const videos = videoInfos.get();

    videos.map((video) => {
        if (video.id.videoId === targetId) return (video.type[$type] = value);
    });
    videoInfos.set(videos);
};
