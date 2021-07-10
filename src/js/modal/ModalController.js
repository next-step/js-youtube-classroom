import { $ } from "../utils.js";
import { getYoutubeResult } from "../API.js";
import ModalSearchController from "./ModalSearchController.js";
import ModalResultController from "./ModalResultController.js";

export default class ModalController {
  constructor({}) {
    this.$searchButton = $("#search-button");
    this.$modalCloseButton = $(".modal-close");
    this.$modal = $(".modal");

    this.state = {
      searchKeyword: "",
      nextPageToken: "",
    };

    this.bindEvents();

    this.ModalSearchController = new ModalSearchController({
      onSubmit: (keyword) => {
        console.log("keyword : ", keyword);
        this.setState(keyword);
      },
    });

    this.ModalResultController = new ModalResultController({});

    this.setState("");
  }

  onModalShow() {
    this.$modal.classList.add("open");
  }

  onModalClose() {
    this.$modal.classList.remove("open");
  }

  bindEvents() {
    let throt;
    this.$searchButton.addEventListener("click", () => this.onModalShow());
    this.$modalCloseButton.addEventListener("click", () => this.onModalClose());
    $('.modal-inner').addEventListener('scroll', (event) => {
      if (!throt) {
        throt = setTimeout(() => {
          throt = null;
          console.log("check ", event)
        }, 300)
      }
    })
    window.addEventListener("click", (event) => {
      event.target === this.$modal ? this.onModalClose() : false;
    });
  }

  search(keyword){
    console.log("before  : ", this.state.searchKeyword)
    console.log("current : ", keyword)
    const receivedResult = getYoutubeResult(keyword)
    return receivedResult
  }

  async setState(keyword) {
    this.ModalResultController.setState({});
    if (keyword.length > 0) {
      const receivedResult = await this.search(keyword)
      this.state.nextPageToken = receivedResult.nextPageToken;
      this.state.searchKeyword = keyword;
      this.ModalResultController.setState(receivedResult);
    }
  }
}
