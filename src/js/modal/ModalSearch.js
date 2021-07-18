import { selectDOM, saveDataToLocalStorage, loadDataFromLocalStorage } from "../utils.js";

export default class ModalSearch {
  $searchForm; $searchButton; $searchInput; $seacrhHistory; onSubmit;
  constructor({ onSubmit }) {
    this.$searchForm = selectDOM("form");
    this.$searchButton = selectDOM("form>button");
    this.$searchInput = selectDOM("form>input");
    this.$seacrhHistory = selectDOM("#search-history");
    this.onSubmit = onSubmit;

    this.searchHistoryAry = [];

    this.bindEvents();
    this.setState();
  }

  addSearchHistory(searchKeyword) {
    if (this.searchHistoryAry !== null) {
      const historyPos = this.searchHistoryAry.indexOf(searchKeyword);
      if (historyPos >= 0) {
        this.searchHistoryAry.splice(historyPos, 1);
      }
      if (this.searchHistoryAry.length > 2) {
        this.searchHistoryAry.shift();
      }
    }
    this.searchHistoryAry.push(searchKeyword);
    saveDataToLocalStorage("searchHistory", this.searchHistoryAry);
    this.setState();
  }

  onSearchFormSubmit(event) {
    const searchKeyword = this.$searchInput.value;
    event.preventDefault();
    this.addSearchHistory(searchKeyword);
    this.onSubmit(searchKeyword);
  }

  onSearchHistoryClick({ target }) {
    if (target.tagName === "A") {
      const searchKeyword = target.innerHTML;
      this.addSearchHistory(searchKeyword);
      this.onSubmit(searchKeyword);
    }
  }

  bindEvents() {
    this.$searchForm.addEventListener("submit", (event) =>
      this.onSearchFormSubmit(event)
    );
    this.$searchButton.addEventListener("click", (event) =>
      this.onSearchFormSubmit(event)
    );
    this.$seacrhHistory.addEventListener("click", (event) =>
      this.onSearchHistoryClick(event)
    );
  }

  render() {
    this.$seacrhHistory.innerHTML = buildSearchHistorySection(
      this.searchHistoryAry
    );
  }

  setState() {
    if (this.searchHistoryAry.length === 0)
      this.searchHistoryAry = loadDataFromLocalStorage("searchHistory");
    this.render();
  }
}

const buildSearchHistorySection = (searchHistory) => {
  let searchHistoryDom = `<span class="text-gray-700">최근 검색어: </span>`;
  searchHistoryDom += searchHistory.map(history => `<a class="chip">${history}</a>`)
  return searchHistoryDom;
};
