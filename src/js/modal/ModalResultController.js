import { $, $$ } from "../utils.js";

export default class ModalResultController {
  constructor() {
    this.$resultSection = $("#search-result");

    this.state = {
        receivedData : {},
        nextPageToken : "",
    }
  }


  render() {
    if (this.state.receivedData === undefined) {
        this.$resultSection.innerHTML = ""
      } else {
        const resultLen = Object.keys(this.state.receivedData).length
        console.log("how may : ", resultLen);
        const domElement = buildResultSection(this.state.receivedData)
        setTimeout(() => {
          this.$resultSection.innerHTML = domElement;
          
        }, 3000);
        this.$resultSection.innerHTML = buildSkeletonSection(resultLen);
      }
  }

  setState({ items, nextPageToken }) {
    this.state.receivedData = items
    this.state.nextPageToken = nextPageToken
    this.render()
  }
}

const buildResultSection = (receivedData) => {
    const items = receivedData
    let resultDomElement = ``

    for(let item of items){
        let data = {
            channelId: item.snippet.channelId,
            channelTitle: item.snippet.channelTitle,
            videoId: item.id.videoId,
            videoTitle: item.snippet.title,
            publishTime: item.snippet.publishTime,
        }
        console.log(data)
        resultDomElement += buildVideoArticle(data)
    }

    return (resultDomElement)
};

const buildVideoArticle = ({channelId, channelTitle, videoId, videoTitle, publishTime}) => {
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
    const cutPos = publishTime.match(/T/).index
    const timeAry = publishTime.substring(0, cutPos).split("-")
    return `${timeAry[0]}년 ${parseInt(timeAry[1])}월 ${parseInt(timeAry[2])}일`
}

const buildSkeletonSection = (resultCnt) => {
  const skeletonDiv = `<article class="clip relative">
                        <div class="skeleton">
                          <div class="image"></div>
                          <p class="line"></p>
                          <p class="line"></p>
                        </div>
                      </article>`;
  let result = ``
  for(let i = 0; i < resultCnt; i++){
    result += skeletonDiv
  }
  return result;
}
