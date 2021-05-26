import { $ } from "../utils/DOM.js";
import {
  createSavedVideoListTemplate,
  emptyVideoListTemplate,
} from "../templates/videoList.js";
import { videoListType } from "../states/videoListType.js";

const $searchModal = $("#video-search-modal");
const $videoList = $("#video-list");

export function openModal() {
  $searchModal.classList.add("open");
}

export function closeModal() {
  $searchModal.classList.remove("open");
}

export function renderSavedVideoList(videoInfos) {
  const filteredVideoInfos = videoListType.getVideoInfos(videoInfos);

  $videoList.innerHTML = filteredVideoInfos.length
    ? createSavedVideoListTemplate(filteredVideoInfos)
    : emptyVideoListTemplate;
}

function snackBar() {
  const $snackbar = $("#snack-bar");
  let timerId = null;

  function show(contents) {
    if (timerId) {
      clearTimeout(timerId);
    }

    $snackbar.innerText = contents;
    $snackbar.classList.toggle("show");
    timerId = setTimeout(() => {
      $snackbar.classList.toggle("show");
    }, 3000);
  }

  return show;
}

export const showSnackBar = snackBar();
