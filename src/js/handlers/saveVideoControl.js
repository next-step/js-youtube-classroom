import {$} from '../utils/DOM.js';
import {SAVED_VIDEO_LIST} from '../constants/localStorage.js';
import {setLocalStorage} from '../utils/localStorage.js';
import {videoInfos} from '../states/videoInfo.js';
import {MAX_SAVEABLE_VIDEO_COUNT} from '../constants/classroom.js';
import {renderSaveButton, renderSaveCancelButton} from '../utils/render.js';
import {loadVideo} from './filterVideo.js';
import {filter} from '../states/filter.js';
import {onSnackbar} from './snackbarControl.js';
import {SAVE_CANCEL_SUCCESS_MSG, SAVE_SUCCESS_MSG} from '../constants/snackbar.js';

export const saveVideoController = ({target}) => {
    if (target.classList.contains('save-button')) {
        if (videoInfos.size >= MAX_SAVEABLE_VIDEO_COUNT) return;

        saveVideo(target.closest('.js-video'));
        renderSaveCancelButton(target.closest('.button-list'));
        onSnackbar(SAVE_SUCCESS_MSG);
    } else if (target.classList.contains('save-cancel-button')) {
        saveCancelVideo(target.closest('.js-video'));
        renderSaveButton(target.closest('.button-list'));
        onSnackbar(SAVE_CANCEL_SUCCESS_MSG);
    }

    loadVideo(filter.get());
};

const saveVideo = ($video) => {
    const videoInfo = createVideoInfo($video.dataset);
    videoInfos.add(videoInfo);
};

const saveCancelVideo = ($video) => {
    const {videoId} = $video.dataset;
    videoInfos.remove(videoId);
};

const createVideoInfo = (videoDataset) => {
    const {videoId, title, channelId, channelTitle, publishTime} = videoDataset;

    return {
        id: {videoId},
        snippet: {title, channelId, channelTitle, publishTime},
        type: {
            isWatched: false,
            isLiked: false,
        },
    };
};
