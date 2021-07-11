import { getPublishedTime } from "./utils.js"

export const buildResultSection = (dataAry) => {
  let resultDomElement = ``;

  for (let data of dataAry) {
    resultDomElement += buildVideoArticle(data);
  }
  return resultDomElement;
};

const buildVideoArticle = ({
  channelId,
  channelTitle,
  videoId,
  videoTitle,
  publishTime,
}) => {
  return `<article class="clip relative" 
          data-video-id=${videoId} 
          data-title=${encodeURI(videoTitle)} 
          data-chanel-id=${channelId} 
          data-channel-title=${encodeURI(channelTitle)} 
          data-publish-time=${publishTime}>
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
      <div class="button-list d-flex justify-end js-save-btn">
        <button class="btn">⬇️ 저장</button>
      </div>
    </article>`;
};

export const buildSkeletonDiv = (resultCnt) => {
  const skeletonArticle = `<article class="clip relative temp-skel">
                          <div class="skeleton">
                            <div class="image"></div>
                            <p class="line"></p>
                            <p class="line"></p>
                          </div>
                        </article>`;
  let result = ``;
  for (let i = 0; i < resultCnt; i++) {
    result += skeletonArticle;
  }
  return result;
};
