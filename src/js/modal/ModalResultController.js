import { $, $$ } from "../utils.js";

export default class ModalResultController {
  constructor() {
    this.$resultSection = $("#search-result");

    this.state = {
      receivedData: {},
      nextPageToken: "",
    };
  }

  render() {
    if (this.state.receivedData === undefined) {
      this.$resultSection.innerHTML = "";
    } else {
      const resultLen = Object.keys(this.state.receivedData).length;
      if (resultLen === 0){
        this.$resultSection.innerHTML = `
        <div>
          <img class="js-not-found"
          src="src/images/status/not_found.png"
          alt="searchResult not found">
          <p class="js-not-found font-semibold"> 검색 결과를 찾을 수 없습니다! </p>
        </div>`;
      } else {  
        const domElement = buildResultSection(this.state.receivedData);
        setTimeout(() => {
          const skeltonDiv = $$('.temp-skel', this.$resultSection)
          for(let i of skeltonDiv){
            this.$resultSection.removeChild(i)
          }
          this.$resultSection.innerHTML += domElement;
        }, 3000);
        this.$resultSection.innerHTML += buildSkeletonDiv(resultLen);
      }
    }
  }

  setState({ items, nextPageToken }) {
    this.state.receivedData = items;
    this.state.nextPageToken = nextPageToken;
    this.render();
  }
}

const buildResultSection = (receivedData) => {
  const items = receivedData;
  let resultDomElement = ``;

  for (let item of items) {
    let data = {
      channelId: item.snippet.channelId,
      channelTitle: item.snippet.channelTitle,
      videoId: item.id.videoId,
      videoTitle: item.snippet.title,
      publishTime: item.snippet.publishTime,
    };
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

const getPublishedTime = (publishTime) => {
  const cutPos = publishTime.match(/T/).index;
  const timeAry = publishTime.substring(0, cutPos).split("-");
  return `${timeAry[0]}년 ${parseInt(timeAry[1])}월 ${parseInt(timeAry[2])}일`;
};

const buildSkeletonDiv = (resultCnt) => {
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
