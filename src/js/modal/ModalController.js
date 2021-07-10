import { $ } from "../utils.js";
import { getYoutubeResult } from "../API.js";
import ModalSearchController from "./ModalSearchController.js";
import ModalResultController from "./ModalResultController.js";

export default class ModalController {
  constructor({}) {
    this.$searchButton = $("#search-button");
    this.$modalCloseButton = $(".modal-close");
    this.$modal = $(".modal");
    this.$modalInner = $(".modal-inner");
    this.throttle;

    this.state = {
      searchKeyword: "",
      searchResult: {},
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
    let throttle
    this.$searchButton.addEventListener("click", () => this.onModalShow());
    this.$modalCloseButton.addEventListener("click", () => this.onModalClose());
    this.$modalInner.addEventListener("scroll", () => {
      if (!throttle) {
        throttle = setTimeout(() => {
          throttle = null;
          if (this.$modalInner.scrollTop + this.$modalInner.clientHeight >= this.$modalInner.scrollHeight) {
            console.log("check")
          } 
        }, 300);
      }
    });
    window.addEventListener("click", (event) => {
      event.target === this.$modal ? this.onModalClose() : false;
    });
  }

  search(keyword) {
    console.log("before  : ", this.state.searchKeyword);
    console.log("current : ", keyword);
    const receivedResult = getYoutubeResult(keyword);
    return receivedResult;
  }

  async setState(keyword) {
    this.ModalResultController.setState({});
    if (keyword.length > 0) {
      const receivedResult = await this.search(keyword);
      this.state.nextPageToken = receivedResult.nextPageToken;
      this.state.searchKeyword = keyword;
      this.ModalResultController.setState(receivedResult);
    }
  }
}



// const onScrollEndCheck = (scrollTop, clientHeight, scrollHeight) => {
//   if (!throttle) {
//     throttle = setTimeout(() => {
//       throttle = null;
//       console.log(scrollTop, clientHeight, scrollHeight) 
//       if (scrollTop + clientHeight >= scrollHeight) {
//         return true;
//       } else {
//         return false;
//       }
//     }, 400);
//   }
// };

// {
//   if (!throt) {
//     throt = setTimeout(() => {
//       throt = null;
//       console.log(this.$modalInner.scrollTop, this.$modalInner.clientHeight, this.$modalInner.scrollHeight)
//       if (this.$modalInner.scrollTop +  this.$modalInner.clientHeight >= this.$modalInner.scrollHeight){
//         console.log("check")
//       }

//     }, 1000)
//   }
// }
