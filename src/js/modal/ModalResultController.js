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
        this.$resultSection.innerHTML = "스켈레톤1";
      } else {
        console.log("how may : ", Object.keys(this.state.receivedData).length);
        const domElement = buildResultSection(this.state.receivedData)
        setTimeout(() => {
          
          this.$resultSection.innerHTML = domElement;
          
        }, 3000);
        this.$resultSection.innerHTML = "스켈레톤2";
      }
  }

  setState(receivedData) {
    this.state.receivedData = receivedData.items
    this.state.nextPageToken = receivedData.nextPageToken
    this.render()
  }
}

const buildResultSection = (receivedData) => {
    const items = receivedData
    let resultDomElement = ``

    for(let item of items){
        //console.log(item)
        let data = {
            channelId: item.snippet.channelId,
            channelTitle: item.snippet.channelTitle,
            videoId: item.id.videoId,
            videoTitle: item.snippet.title,
            videoPublished: item.snippet.publishTime,
        }
        console.log(data)
    }

    return (`<div>예스</div>`)
};

const buildVideoArticle = (videoData) => {
  `<article class="clip">
    <div class="preview-container">
      <iframe
        width="100%"
        height="118"
        src="https://www.youtube.com/embed/Ngj3498Tm_0"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowfullscreen
      ></iframe>
    </div>
    <div class="content-container pt-2 px-1">
      <h3>아두이노 무드등</h3>
      <div>
        <a
          href="https://www.youtube.com/channel/UC-mOekGSesms0agFntnQang"
          target="_blank"
          class="channel-name mt-1"
        >
          메이커준
        </a>
        <div class="meta">
          <p>2021년 3월 2일</p>
        </div>
        <div class="d-flex justify-end">
          <button class="btn">⬇️ 저장</button>
        </div>
      </div>
    </div>
  </article>`;
};
