import {saveButtonTemplate, saveCancelButtonTemplate} from '../templates/saveButton.js';

export const renderSaveCancelButton = ($target) => {
    $target.innerHTML = saveCancelButtonTemplate();
};

export const renderSaveButton = ($target) => {
    $target.innerHTML = saveButtonTemplate();
};
