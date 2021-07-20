import {SAVED_VIDEO_LIST} from '../constants/localStorage.js';
import {getLocalStorage, setLocalStorage} from '../utils/localStorage.js';

export const videoInfos = {
    value: [],

    init() {
        this.set(getLocalStorage(SAVED_VIDEO_LIST) ?? []);
    },

    get() {
        return this.value;
    },

    set(newVideoInfo = []) {
        this.value = newVideoInfo;
        setLocalStorage(SAVED_VIDEO_LIST, this.value ?? []);
    },

    add(newVideoInfo = {}) {
        this.value.push(newVideoInfo);
        setLocalStorage(SAVED_VIDEO_LIST, this.value ?? []);
    },

    remove(targetId) {
        const oldVideoInfo = [...this.value];
        const newVideoinfo = oldVideoInfo.filter(({id}) => id.videoId != targetId);
        this.set(newVideoinfo);
    },

    get size() {
        return this.value.length;
    },
};
