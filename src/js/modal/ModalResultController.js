import { $, $$ } from "../utils.js";
import { buildResultSection, buildSkeletonDiv, cannotFoundKeyword } from "../DOM.js"

export default class ModalResultController {
  constructor() {
    this.$resultSection = $("#search-result");

    this.state = {
      receivedData: {},
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
        this.$resultSection.innerHTML = cannotFoundKeyword();
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

  setState({ items }) {
    this.state.receivedData = items;
    this.render();
  }
}

