import {Store} from "~_core";
import {YoutubeClipItem} from "~domain";
import { youtubeService, recentSearchesService } from "~services";

export const SET_RECENT_SEARCHES = 'SET_RECENT_SEARCHES';
export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS';
export const YOUTUBE_SEARCH = 'YOUTUBE_SEARCH';

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
    async [YOUTUBE_SEARCH] ({ commit }, q) {
      const { items } = await youtubeService.search(q);
      recentSearchesService.addSearchKey(q);

      commit(SET_SEARCH_RESULTS, items);
      commit(SET_RECENT_SEARCHES, recentSearchesService.getSearches());
    }
  },
});
