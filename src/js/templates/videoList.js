import { formatDate } from "../utils/date.js";

function videoSaveSnippet({ id, snippet }, isSaved) {
  return `<article class="clip js-video relative"
            data-video-id=${id.videoId}
            data-title=${encodeURIComponent(snippet.title)}
            data-channel-id=${snippet.channelId}
            data-channel-title=${encodeURIComponent(snippet.channelTitle)}
            data-publish-time=${snippet.publishTime}
          >
            <div class="preview-container">
              <iframe
                class="js-preview"
                width="100%"
                height="118"
                src="https://www.youtube.com/embed/${id.videoId}"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
            <div class="content-container pt-2 px-1">
              <h3>${decodeURIComponent(snippet.title)}</h3>
              <div>
                <a
                  href="https://www.youtube.com/channel/${snippet.channelId}"
                  target="_blank"
                  class="channel-name mt-1"
                >
                ${decodeURIComponent(snippet.channelTitle)}
                </a>
                <div class="meta">
                  <p>${formatDate(snippet.publishTime)}</p>
                </div>
              </div>
            </div>
            <div class="button-list d-flex justify-end" >
              ${
                isSaved
                  ? `<button class="btn js-save-cancel-button"}>↪️ 저장 취소</button>`
                  : `<button class="btn js-save-button"}>⬇️ 저장</button>`
              }
            </div>
          </article>`;
}

function isSavedVideo(item, videoInfos) {
  return [...videoInfos].some(
    (videoInfo) => videoInfo.id.videoId === item.id.videoId
  );
}

export function createVideoListTemplate(resultItems = [], videoInfos) {
  return [...resultItems]
    .map((item) => videoSaveSnippet(item, isSavedVideo(item, videoInfos)))
    .join("");
}

function videoControlSnippet({ id, snippet, type: { isWatched, isLiked } }) {
  return `<article class="clip js-video relative"
            data-video-id=${id.videoId}
            data-title=${encodeURIComponent(snippet.title)}
            data-channel-id=${snippet.channelId}
            data-channel-title=${encodeURIComponent(snippet.channelTitle)}
            data-publish-time=${snippet.publishTime}
          >
            <div class="preview-container">
              <iframe
                class="js-preview"
                width="100%"
                height="118"
                src="https://www.youtube.com/embed/${id.videoId}"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen
              ></iframe>
            </div>
            <div class="content-container pt-2 px-1">
              <h3>${decodeURIComponent(snippet.title)}</h3>
              <div>
                <a
                  href="https://www.youtube.com/channel/${snippet.channelId}"
                  target="_blank"
                  class="channel-name mt-1"
                >
                ${decodeURIComponent(snippet.channelTitle)}
                </a>
                <div class="meta">
                  <p>${formatDate(snippet.publishTime)}</p>
                </div>
              </div>
            </div>
            <div class="button-list d-flex justify-end" >
              <span class="${
                !isWatched && "opacity-hover"
              } ml-2 js-watched-button">✅</span>
              <span class="${
                !isLiked && "opacity-hover"
              } ml-2 js-liked-button">👍🏻</span>
              <span class="opacity-hover ml-2 js-delete-button">🗑</span>
            </div>
          </article>`;
}

export function createSavedVideoListTemplate(savedVideoInfos = []) {
  return savedVideoInfos.map(videoControlSnippet).join("");
}

export const emptyVideoListTemplate = `<span id="empty-video-list" class="stretch text-center">영상이 없습니다. 😥</span>`;
