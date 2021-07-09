import {moreVideoLoadController} from '../handlers/videoLoadControl.js';
import {$} from './DOM.js';

export const intersectionObserver = {
    value: {},
    options: {
        root: $('#modal-inner'),
        rootMargin: '0px',
        threshold: 0.85,
    },

    init() {
        this.set(new IntersectionObserver(moreVideoLoadController.bind(this), this.options));
    },

    set(observer) {
        this.value = observer;
    },

    get() {
        return this.value;
    },

    disconnect() {
        this.value.disconnect();
    },

    observe($target) {
        this.value.observe($target);
    },
};
