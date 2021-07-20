import {$} from '../utils/DOM.js';
import {createSavedVideoListTemplate} from '../templates/savedVideoList.js';
import {saveButtonTemplate, saveCancelButtonTemplate} from '../templates/button.js';

const $savedVideoList = $('#video-list');

export const renderSaveCancelButton = ($target) => {
    $target.innerHTML = saveCancelButtonTemplate();
};

export const renderSaveButton = ($target) => {
    $target.innerHTML = saveButtonTemplate();
};

export const renderSavedVideo = (savedVideoInfos) => {
    $savedVideoList.innerHTML = createSavedVideoListTemplate(savedVideoInfos);
};
