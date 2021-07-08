import {onModalClose, onModalShow} from './handlers/modalControl.js';
import {onSearchVideo} from './handlers/searchVideoControl.js';
import {$} from './utils/DOM.js';

export const initState = () => {};

export const initEvent = () => {
    $('#search-button').addEventListener('click', onModalShow);
    $('.modal-close').addEventListener('click', onModalClose);
};
