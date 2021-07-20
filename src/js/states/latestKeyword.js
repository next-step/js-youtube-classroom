import {MAX_STORE_KEYWORD_COUNT} from '../constants/classroom.js';
import {LATEST_KEYWORD_LIST} from '../constants/localStorage.js';
import {createLatestKeyword} from '../templates/latestKeyword.js';
import {getLocalStorage, setLocalStorage} from '../utils/localStorage.js';

export const latestKeywords = {
    value: [],

    init() {
        this.set(getLocalStorage(LATEST_KEYWORD_LIST) ?? []);
    },

    get() {
        return this.value;
    },

    set(newKeyword = []) {
        this.value = newKeyword;
        setLocalStorage(LATEST_KEYWORD_LIST, this.value ?? []);
        createLatestKeyword(this.value);
    },

    add(newKeyword = '') {
        const targetIndex = this.value.indexOf(newKeyword);
        if (targetIndex > -1) {
            this.value.splice(targetIndex, 1);
            this.value.unshift(newKeyword);
        } else {
            this.value.unshift(newKeyword);
            if (this.size > MAX_STORE_KEYWORD_COUNT) this.value.pop();
        }

        setLocalStorage(LATEST_KEYWORD_LIST, this.value ?? []);
        createLatestKeyword(this.value);
    },

    get size() {
        return this.value.length;
    },
};
