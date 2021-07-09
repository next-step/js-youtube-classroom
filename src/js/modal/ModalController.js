import { $, $$ } from "../utils.js";
import { getYoutubeResult } from "../API.js";
import ModalSearchController from "./ModalSearchController.js";
import ModalResultController from "./ModalResultController.js";

export default class ModalController {
  constructor({}) {
    this.$searchButton = $("#search-button");
    this.$modalCloseButton = $(".modal-close");
    this.$modal = $(".modal");

    this.bindEvents();

    this.ModalSearchController = new ModalSearchController({
      onSubmit: (keyword) => {
        console.log("keyword : ", keyword);
        this.setState(keyword)
      },
    });

    this.ModalResultController = new ModalResultController({
    })

    this.setState("")
  }


  onModalShow() {
    this.$modal.classList.add("open");
  }

  onModalClose() {
    this.$modal.classList.remove("open");
  }

  bindEvents() {
    this.$searchButton.addEventListener("click", () => this.onModalShow());
    this.$modalCloseButton.addEventListener("click", () => this.onModalClose());
  }

  async setState(keyword){
      this.ModalResultController.setState([]);
      if (keyword.length > 0){
        const receivedResult = await getYoutubeResult(keyword);
        this.ModalResultController.setState(receivedResult);
      }
  }
}
