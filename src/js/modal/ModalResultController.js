import { $, $$ } from "../utils.js";
import { buildResultSection, buildSkeletonDiv } from "../DOM.js"

export default class ModalResultController {
  constructor() {
    this.$resultSection = $("#search-result");

    this.state = {
      receivedData: {},
      nextPageToken: "",
    };
  }

  getDataFromItems(receivedData) {
    const items = receivedData;
    const dataAry = [];

    for (let item of items) {
      let data = {
        channelId: item.snippet.channelId,
        channelTitle: item.snippet.channelTitle,
        videoId: item.id.videoId,
        videoTitle: item.snippet.title,
        publishTime: item.snippet.publishTime,
      };
      dataAry.push(data);
    }
    return dataAry
  }

  render() {
    if (this.state.receivedData === undefined) {
      this.$resultSection.innerHTML = "";
    } else {
      const resultLen = Object.keys(this.state.receivedData).length;
      if (resultLen === 0) {
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
          const skeltonDiv = $$(".temp-skel", this.$resultSection);
          for (let i of skeltonDiv) {
            this.$resultSection.removeChild(i);
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

