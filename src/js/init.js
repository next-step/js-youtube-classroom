import {$} from './utils/DOM.js';
import {onModalClose, onModalShow} from './handlers/modalControl.js';
import {searchLatestKeywordController, searchVideoController} from './handlers/searchVideoControl.js';
import {intersectionObserver} from './utils/intersectionObserver.js';
import {saveVideoController} from './handlers/saveVideoControl.js';
import {videoInfos} from './states/videoInfo.js';
import {latestKeywords} from './states/latestKeyword.js';
import {changeVideoStatus} from './handlers/changeVideoStatus.js';

export const initState = () => {
    intersectionObserver.init();
    videoInfos.init();
    latestKeywords.init();
};

export const initEvent = () => {
    $('#video-search-form').addEventListener('submit', searchVideoController);
    $('#search-button').addEventListener('click', onModalShow);
    $('.modal-close').addEventListener('click', onModalClose);
    $('#video-search-result').addEventListener('click', saveVideoController);
    $('#latest-keyword-list').addEventListener('click', searchLatestKeywordController);
    $('#video-list').addEventListener('click', changeVideoStatus);
};
