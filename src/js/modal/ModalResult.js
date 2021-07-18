import {
  selectDOM,
  selectDOMS,
  saveDataToLocalStorage,
  loadDataFromLocalStorage,
  checkDuplicateID,
  emit,
  makeDataset,
} from "../utils.js";
import {
  buildResultSection,
  buildSkeletonDiv,
  cannotFoundKeyword,
} from "../DOM.js";

export default class ModalResult {
  $resultSection; $saveCount;
  constructor() {
    this.$resultSection = selectDOM("#search-result");
    this.$saveCount = selectDOM(".save-cnt");

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
        return alert("최대로 저장할 수 있는 한도에 도달했습니다!");
      }
      const {channelId, channelTitle, videoId, title ,publishTime} = target.closest("article").dataset;
      const data = makeDataset(channelId, decodeURI(channelTitle), videoId, decodeURI(title), publishTime)
      const dataPos = checkDuplicateID(
        data.videoId,
        this.state.savedVideos
      );

      if (dataPos >= 0) {
        if (!confirm("정말 저장을 취소하시겠습니까?")) return;
          this.state.savedVideos.splice(dataPos, 1);
          target.innerHTML = "⬇️ 저장";
      } else {
        this.state.savedVideos.push(data);
        target.innerHTML = "↪️ 저장 취소";
      }

      saveDataToLocalStorage("savedVideos", this.state.savedVideos);
      this.$saveCount.innerHTML = `저장된 영상 갯수: ${this.state.savedVideos.length}개`;
      target.classList.toggle("saved");
      emit(selectDOM("#selected-result"), "@save", {});
      emit(selectDOM("#snackbar"), "@snack", {message: "영상이 저장되었습니다!"});
    }
  }

  bindEvents() {
    this.$resultSection.addEventListener("click", (event) =>
      this.onClickSaveButtton(event)
    );
  }

  getDataFromItems(receivedData) {
    const items = receivedData;
    const dataAry = items.map((item) => {
      const { channelId, channelTitle, title, publishTime} = item.snippet
      return makeDataset (channelId, channelTitle, item.id.videoId, title, publishTime)
    })
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
          const skeltonDiv = selectDOMS(".temp-skel", this.$resultSection);
          for (let i of skeltonDiv) {
            this.$resultSection.removeChild(i);
          }
          this.$resultSection.innerHTML += domElement;
        }, 3000);
        this.$resultSection.innerHTML += buildSkeletonDiv(resultLen);
      }
    }
    this.$saveCount.innerHTML = `저장된 영상 갯수: ${this.state.savedVideos.length}개`;
  }

  setState({ items }) {
    this.state.receivedData = items;
    this.state.savedVideos = loadDataFromLocalStorage("savedVideos");
    this.render();
  }
}
