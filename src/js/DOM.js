import { getPublishedTime, checkDuplicateID } from "./utils.js";

const MODAL = 1;

export const cannotFoundKeyword = () => {
  return `
  <div>
    <img class="js-not-found"
         src="src/images/status/not_found.png"
         alt="searchResult not found"
    />
    <p class="js-not-found font-semibold"> 검색 결과를 찾을 수 없습니다! </p>
  </div>`;
};

export const buildResultSection = (dataArray, savedVideos, position) => {
  return dataArray
    .map((data) => buildVideoArticle(data, savedVideos, position))
    .join("");
};

const buildVideoArticle = (
  { channelId, channelTitle, videoId, videoTitle, publishTime } = [],
  savedVideos,
  position
) => {
  return `<article 
            class="clip relative" 
            data-video-id=${videoId} 
            data-title=${encodeURI(videoTitle)} 
            data-channel-id=${channelId} 
            data-channel-title=${encodeURI(channelTitle)} 
            data-publish-time=${publishTime}
          />
      <div class="preview-container">
        <iframe
          class="js-preview"
          width="100%"
          height="118"
          src="https://www.youtube.com/embed/${videoId}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
          loading="lazy"
        ></iframe>
      </div>
      <div class="content-container pt-2 px-1">
        <h3>${videoTitle}</h3>
        <div>
          <a
            href="https://www.youtube.com/channel/${channelId}"
            target="_blank"
            class="channel-name mt-1"
          >
              ${channelTitle}
          </a>
          <div class="meta">
              <p>${getPublishedTime(publishTime)}</p>
          </div>
        </div>
      </div>
      ${
        position === MODAL
          ? ` <div class="button-list d-flex justify-end js-save-btn">
      ${
        checkDuplicateID(videoId, savedVideos) >= 0
          ? `<button class="btn saved">↪️ 저장 취소</button>`
          : `<button class="btn">⬇️ 저장</button>`
      }
      </div>`
          : `<div>
      <span class="opacity-hover">✅</span>
      <span class="opacity-hover">👍</span>
      <span class="opacity-hover">💬</span>
      <span class="opacity-hover">🗑️</span>
    </div>`
      }
     
    </article>`;
};

export const buildSkeletonDiv = (resultCnt) => {
  return Array(resultCnt)
    .fill(0)
    .map(
      () => `
    <article class="clip relative temp-skel">
      <div class="skeleton">
        <div class="image"></div>
        <p class="line"></p>
        <p class="line"></p>
      </div>
    </article>
  `
    )
    .join("");
};
