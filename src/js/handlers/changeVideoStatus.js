import {DELETE_CONFIRM_NSG} from '../constants/message.js';
import {
    DELETE_SUCCESS_MSG,
    LIKED_SUCCESS_MSG,
    LIKE_CANCEL_SUCCESS_MSG,
    TO_WATCH_SUCCESS_MSG,
    WATCHED_SUCCESS_MSG,
} from '../constants/snackbar.js';
import {filter} from '../states/filter.js';
import {videoInfos} from '../states/videoInfo.js';
import {loadVideo} from './filterVideo.js';
import {onSnackbar} from './snackbarControl.js';

export const changeVideoStatus = ({target}) => {
    const option = target.id;
    if (!['watched', 'liked', 'delete'].includes(option)) return;
    changeStatus(target, option);
    loadVideo(filter.get());
};

const changeStatus = (target, option) => {
    const {videoId} = target.closest('.js-video').dataset;

    const status = {
        watched: () => handleWatchedButton(target),
        liked: () => handleLikedButton(target),
        delete: () => {
            if (confirm(DELETE_CONFIRM_NSG)) {
                videoInfos.remove(videoId);
                onSnackbar(DELETE_SUCCESS_MSG);
            }
        },
    };

    return status[option]();
};

const handleWatchedButton = (target) => {
    if (target.classList.contains('opacity-hover')) {
        changeButton(target, 'opacity-hover', 'false');
        setVideoStatus(target, 'isWatched', true);

        onSnackbar(WATCHED_SUCCESS_MSG);
    } else {
        changeButton(target, 'false', 'opacity-hover');
        setVideoStatus(target, 'isWatched', false);

        onSnackbar(TO_WATCH_SUCCESS_MSG);
    }
};

const handleLikedButton = (target) => {
    if (target.classList.contains('opacity-hover')) {
        changeButton(target, 'opacity-hover', 'false');
        setVideoStatus(target, 'isLiked', true);

        onSnackbar(LIKED_SUCCESS_MSG);
    } else {
        changeButton(target, 'false', 'opacity-hover');
        setVideoStatus(target, 'isLiked', false);

        onSnackbar(LIKE_CANCEL_SUCCESS_MSG);
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
