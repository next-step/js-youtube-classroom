import { renderSavedVideoList } from "../viewControllers/app.js";
import { renderSavedVideoCount } from "../viewControllers/searchModal.js";
import { VIDEO_INFOS } from "../constants/localStorage.js";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage.js";

export const videoInfos = {
  value: new Set(),

  init() {
    const videoInfos = getLocalStorage(VIDEO_INFOS) ?? [];

    this.set(videoInfos);
  },

  add(newVideoInfo = {}) {
    this.value.add(newVideoInfo);
    setLocalStorage(VIDEO_INFOS, [...this.value]);

    renderSavedVideoCount(this.value.size);
    renderSavedVideoList([...this.value]);
  },

  remove(targetId) {
    const oldVideoInfos = [...this.value];
    const newVideoInfos = oldVideoInfos.filter(
      ({ id }) => id.videoId !== targetId
    );

    this.set(newVideoInfos);
  },

  set(newVideoInfos = []) {
    this.value = new Set(newVideoInfos);
    setLocalStorage(VIDEO_INFOS, [...this.value]);

    renderSavedVideoCount(this.value.size);
    renderSavedVideoList([...this.value]);
  },

  get() {
    return this.value;
  },

  get size() {
    return this.value.size;
  },
};
