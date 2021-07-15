import { selectDOM } from "../utils.js";
import { getYoutubeResultFromAPI, getNextYoutubeResultFromAPI } from "../API.js";
import ModalSearch from "./ModalSearch.js";
import ModalResult from "./ModalResult.js";

export default class Modal {
  $searchButton; $modalCloseButton; $modal; $modalInner; $throttle;
  constructor() {
    this.$searchButton = selectDOM("#search-button");
    this.$modalCloseButton = selectDOM(".modal-close");
    this.$modal = selectDOM(".modal");
    this.$modalInner = selectDOM(".modal-inner");
    this.throttle

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

  onModalShow = () => {
    this.$modal.classList.add("open");
  }

  onModalClose = () => {
    this.$modal.classList.remove("open");
  }

  setThrottle = (scrollTop, clientHeight, scrollHeight) => {
    if (!this.throttle && scrollTop + clientHeight >= scrollHeight) {
      this.throttle = setTimeout(() => {
        this.throttle = null;
        this.setState(this.state.searchKeyword);
      }, 300);
    }
  };

  bindEvents() {
    this.$searchButton.addEventListener("click", this.onModalShow);
    this.$modalCloseButton.addEventListener("click", this.onModalClose);
    this.$modalInner.addEventListener("scroll",
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
        receivedResult = await getNextYoutubeResultFromAPI(
          keyword,
          this.state.nextPageToken
        );
      } else {
        this.ModalResult.setState({});
        receivedResult = await getYoutubeResultFromAPI(keyword);
      }
      this.state.nextPageToken = receivedResult.nextPageToken;
      this.state.searchKeyword = keyword;
      this.ModalResult.setState(receivedResult);
    } else {
      this.ModalResult.setState({});
    }
  }
}
