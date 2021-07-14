import api from "../api/apiHandler.js";
import { SearchResultsTemplate } from "../utils/templates.js";
import { data } from '../utils/mock.js';
export default class SearchResults {
	constructor({ keyword, $searchResults }) {
		this.keyword = keyword;
		this.$searchResults = $searchResults;
	}

	setState(nextKeyword) {
		this.keyword = nextKeyword;
		this.render();
	}
	async render() {
		try {
      console.log(this.keyword);
      // const response = await api.fetchResult(this.keyword);
      const response = data;
      console.log(response)
			this.$searchResults.innerHTML = SearchResultsTemplate(response);
		} catch (e) {
			this.$searchResults.innerHTML = "";
			console.error(e);
		}
	}
}
