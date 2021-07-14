import { $ } from "../utils.js";
import { getYoutubeResult } from "../API.js";
import ModalSearch from "./ModalSearch.js";
import ModalResult from "./ModalResult.js";

export default class Modal {
  constructor() {
    this.$searchButton = $("#search-button");
    this.$modalCloseButton = $(".modal-close");
    this.$modal = $(".modal");
    this.$modalInner = $(".modal-inner");

    this.state = {
      searchKeyword: "",
      nextPageToken: "",
    };

    this.bindEvents();

    this.ModalSearch = new ModalSearch({
      onSubmit: (keyword) => {
        this.setState(keyword);
      },
    });

    this.ModalResult = new ModalResult();

    this.setState("");
  }

  onModalShow() {
    this.$modal.classList.add("open");
  }

  onModalClose() {
    this.$modal.classList.remove("open");
  }

  setThrottle = (scrollTop, clientHeight, scrollHeight) => {
    let throttle;
    if (!throttle) {
      throttle = setTimeout(() => {
        throttle = null;
        if (scrollTop + clientHeight >= scrollHeight) {
          this.setState(this.state.searchKeyword);
        }
      }, 300);
    }
  };

  bindEvents() {
    this.$searchButton.addEventListener("click", () => this.onModalShow());
    this.$modalCloseButton.addEventListener("click", () => this.onModalClose());
    this.$modalInner.addEventListener("scroll", () =>
      this.setThrottle(
        this.$modalInner.scrollTop,
        this.$modalInner.clientHeight,
        this.$modalInner.scrollHeight
      )
    );
    window.addEventListener("click", (event) => {
      event.target === this.$modal ? this.onModalClose() : false;
    });
  }

  async setState(keyword) {
    let receivedResult;
    if (keyword.length > 0) {
      if (this.state.searchKeyword === keyword) {
        receivedResult = await getYoutubeResult(
          keyword,
          this.state.nextPageToken
        );
      } else {
        this.ModalResult.setState({});
        receivedResult = await getYoutubeResult(keyword);
      }
      this.state.nextPageToken = receivedResult.nextPageToken;
      this.state.searchKeyword = keyword;
      this.ModalResult.setState(receivedResult);
    } else {
      this.ModalResult.setState({});
    }
  }
}
