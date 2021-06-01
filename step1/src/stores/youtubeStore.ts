import {Store} from "~_core";
import {YoutubeClipItem} from "~domain";
import { youtubeService, recentSearchesService } from "~services";

export const SET_RECENT_SEARCHES = 'SET_RECENT_SEARCHES';
export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS';
export const SET_SEARCH_LOADING = 'SET_SEARCH_LOADING';
export const YOUTUBE_SEARCH = 'YOUTUBE_SEARCH';

interface State {
  recentSearches: Set<string>;
  searchResults: YoutubeClipItem[];
  searchLoading: boolean;
}

export const youtubeStore = new Store<State>({
  state: {
    recentSearches: recentSearchesService.getSearches(),
    searchResults: [],
    searchLoading: false,
  },

  mutations: {

    [SET_RECENT_SEARCHES] (state: State, recentSearches: Set<string>) {
      state.recentSearches = recentSearches;
    },

    [SET_SEARCH_RESULTS] (state: State, searchResults: YoutubeClipItem[]) {
      state.searchResults = searchResults;
    },

    [SET_SEARCH_LOADING] (state: State, searchLoading: boolean) {
      state.searchLoading = searchLoading;
    },
  },

  actions: {
    async [YOUTUBE_SEARCH] ({ commit }, q) {
      commit(SET_SEARCH_LOADING, true);
      try {
        const {items} = await youtubeService.search(q);
        recentSearchesService.addSearchKey(q);

        commit(SET_SEARCH_RESULTS, items);
        commit(SET_RECENT_SEARCHES, recentSearchesService.getSearches());
      } catch (e) {
        throw new Error(e);
      }
      commit(SET_SEARCH_LOADING, false);
    }
  },
});
