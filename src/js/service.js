import { fetchSearchResult } from "./API.js";
import { intersectionObserver } from "./states/intersectionObserver.js";
import { pageToken } from "./states/pageToken.js";
import { videoInfos } from "./states/videoInfos.js";
import {
  renderVideoLoader,
  renderVideoSearchResult,
} from "./viewControllers/searchModal.js";
import { $ } from "./utils/DOM.js";

export function createVideoInfo(videoDataset) {
  const { videoId, title, channelId, channelTitle, publishTime } = videoDataset;

  return {
    id: { videoId },
    snippet: { title, channelId, channelTitle, publishTime },
    type: {
      isWatched: false,
      isLiked: false,
    },
  };
}

export async function searchVideo(keyword) {
  renderVideoLoader();
  const { nextPageToken, items } = await fetchSearchResult(keyword);
  const filteredItems = items.filter((item) => item.id.videoId);

  pageToken.set(nextPageToken);
  renderVideoSearchResult(filteredItems, videoInfos.get());

  return items;
}

export function saveVideo($video) {
  const videoInfo = createVideoInfo($video.dataset);

  videoInfos.add(videoInfo);
}

export function cancelVideoSave($video) {
  const { videoId } = $video.dataset;

  videoInfos.remove(videoId);
}

export function initInfiniteScroll() {
  const $lastVideo = $("#video-search-result .js-video:last-child");

  intersectionObserver.disconnect();
  intersectionObserver.observe($lastVideo);
}
