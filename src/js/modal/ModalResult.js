import {
  $,
  $$,
  saveDataToLocalStorage,
  loadDataFromLocalStorage,
  checkDuplicateID,
  emit,
} from "../utils.js";
import {
  buildResultSection,
  buildSkeletonDiv,
  cannotFoundKeyword,
} from "../DOM.js";

export default class ModalResult {
  constructor() {
    this.$resultSection = $("#search-result");
    this.$saveCount = $(".save-cnt")

    this.state = {
      receivedData: {},
      savedVideos: [],
    };

    this.bindEvents();
    this.setState({});
  }

  onClickSaveButtton({ target }) {
    if (target.tagName === "BUTTON") {
      if (this.state.savedVideos.length === 100) {
        alert("최대로 저장할 수 있는 한도에 도달했습니다!")
        return ;
      }
      const parentArticle = target.closest("article");
      const data = {
        channelId: parentArticle.dataset.channelId,
        channelTitle: decodeURI(parentArticle.dataset.channelTitle),
        videoId: parentArticle.dataset.videoId,
        videoTitle: decodeURI(parentArticle.dataset.title),
        publishTime: parentArticle.dataset.publishTime,
      };

      if (target.classList.contains("saved")) {
        console.log("saved");
        if (confirm("정말 저장을 취소하시겠습니까?")){
          const dataPos = checkDuplicateID(data.videoId, this.state.savedVideos)
          this.state.savedVideos.splice(dataPos, 1);
          target.innerHTML = "⬇️ 저장"
        } else {
          return ;
        }
      } else {
        console.log("not saved");
        target.innerHTML = "↪️ 저장 취소";
        this.state.savedVideos.push(data);
      }
      saveDataToLocalStorage("savedVideos", this.state.savedVideos);
      this.$saveCount.innerHTML = `저장된 영상 갯수: ${this.state.savedVideos.length}개`
      target.classList.toggle("saved");
      emit($("#saved-result"), "@save", { value: this.state.savedVideos})
      console.log(this.state.savedVideos)
    }
  }

  bindEvents() {
    this.$resultSection.addEventListener("click", (event) =>
      this.onClickSaveButtton(event)
    );
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
    return dataAry;
  }

  render() {
    if (this.state.receivedData === undefined) {
      this.$resultSection.innerHTML = "";
    } else {
      const resultLen = Object.keys(this.state.receivedData).length;
      if (resultLen === 0) {
        this.$resultSection.innerHTML = cannotFoundKeyword();
      } else {
        const domElement = buildResultSection(
          this.getDataFromItems(this.state.receivedData),
          this.state.savedVideos,
          1
        );
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
    this.$saveCount.innerHTML = `저장된 영상 갯수: ${this.state.savedVideos.length}개`
  }

  setState({ items }) {
    this.state.receivedData = items;
    this.state.savedVideos = loadDataFromLocalStorage("savedVideos");
    this.render();
  }
}


