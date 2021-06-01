import {Store} from "~_core/Store";
import {YoutubeClipItem} from "~domain";
import { youtubeService, recentSearchesService } from "~services";

const SET_RECENT_SEARCHES = 'SET_RECENT_SEARCHES';
const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS';
const SEARCH = 'SEARCH';

interface State {
  recentSearches: string[];
  searchResults: YoutubeClipItem[];
}

export const youtubeStore = new Store<State>({
  state: {
    recentSearches: [],
    searchResults: [],
  },

  mutations: {
    [SET_RECENT_SEARCHES] (state: State, recentSearches: string[]) {
      state.recentSearches = recentSearches;
    },

    [SET_SEARCH_RESULTS] (state: State, searchResults) {
      state.searchResults = searchResults;
    },
  },

  actions: {
    async [SEARCH] ({ commit }, q) {
      try {
        const result = await youtubeService.search(q);
        recentSearchesService.addSearchKey(q);

        commit(SET_SEARCH_RESULTS, result);
        commit(SET_RECENT_SEARCHES, recentSearchesService.getSearches());

      } catch (e) {
        console.error(e);
      }
    }
  },
});
