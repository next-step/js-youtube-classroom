import SearchInput from "./modal/SearchInput.js";

export default class App {
  constructor({
    $searchButton,
    $modal,
    $modalClose,
    $searchInput,
    $searchInputButton,
  }) {
    this.$searchButton = $searchButton;
    this.$modal = $modal;
    this.$modalClose = $modalClose;
    this.$searchInput = $searchInput;
    this.$searchInputButton = $searchInputButton;

    const onModalShow = () => {
      $modal.classList.add("open");
    };

    const onModalClose = () => {
      $modal.classList.remove("open");
    };

    const searchInput = new SearchInput({ $searchInput, $searchInputButton });

    this.$searchButton.addEventListener("click", onModalShow);
    this.$modalClose.addEventListener("click", onModalClose);
  }
}
