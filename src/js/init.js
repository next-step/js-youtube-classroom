import {$} from './utils/DOM.js';
import {onModalClose, onModalShow} from './handlers/modalControl.js';
import {searchVideoController} from './handlers/searchVideoControl.js';
import {intersectionObserver} from './utils/intersectionObserver.js';

export const initState = () => {
    intersectionObserver.init();
};

export const initEvent = () => {
    $('#video-search-form').addEventListener('submit', searchVideoController);
    $('#search-button').addEventListener('click', onModalShow);
    $('.modal-close').addEventListener('click', onModalClose);
};
