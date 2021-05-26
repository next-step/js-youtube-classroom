import { LIKED, TO_WATCH, WATCHED } from "../constants/classroom.js";

function getToWatchVideos(videoInfos) {
  return videoInfos.filter((videoInfo) => !videoInfo.type.isWatched);
}

function getWatchedVideos(videoInfos) {
  return videoInfos.filter((videoInfo) => videoInfo.type.isWatched);
}

function getLikedVideos(videoInfos) {
  return videoInfos.filter((videoInfo) => videoInfo.type.isLiked);
}

export const videoListType = {
  value: TO_WATCH,

  set(mode) {
    this.value = mode;
  },

  get() {
    return this.value;
  },

  getVideoInfos(videoInfos) {
    const filteredVideoInfos = {
      [TO_WATCH]: () => getToWatchVideos(videoInfos),
      [WATCHED]: () => getWatchedVideos(videoInfos),
      [LIKED]: () => getLikedVideos(videoInfos),
    };

    return filteredVideoInfos[this.value]();
  },
};
