import SearchInput from "./modal/SearchInput.js";
import SearchResults from "./modal/SearchResults.js";

export default class App {
	constructor({
		keyword,
		$searchButton,
		$modal,
		$modalClose,
		$searchInput,
		$searchInputButton,
		$searchResults,
	}) {
		this.keyword = keyword;
		this.$searchButton = $searchButton;
		this.$modal = $modal;
		this.$modalClose = $modalClose;
		this.$searchInput = $searchInput;
		this.$searchInputButton = $searchInputButton;
		this.$searchResults = $searchResults;

		const onModalShow = () => {
			$modal.classList.add("open");
		};

		const onModalClose = () => {
			$modal.classList.remove("open");
		};

		this.searchInput = new SearchInput({
			$searchInput,
			$searchInputButton,
			onInput: async (text) => {
        this.setState(text);
			},
		});
		this.searchResults = new SearchResults({ keyword, $searchResults });

		this.$searchButton.addEventListener("click", onModalShow);
		this.$modalClose.addEventListener("click", onModalClose);
  }
  
  setState(nextKeyword) {
    this.keyword = nextKeyword;
    this.searchResults.setState(this.keyword);
  }

}
