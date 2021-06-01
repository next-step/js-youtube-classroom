import {Store} from "~_core";
import {YoutubeClipItem} from "~domain";
import {youtubeService, recentSearchesService, lectureVideoService} from "~services";
import {LectureVideo} from "~repositories";

export const SET_RECENT_SEARCHES = 'SET_RECENT_SEARCHES';
export const SET_SEARCH_RESULTS = 'SET_SEARCH_RESULTS';
export const SET_SEARCH_LOADING = 'SET_SEARCH_LOADING';
export const SET_LECTURE_VIDEOS = 'SET_LECTURE_VIDEOS';
export const YOUTUBE_SEARCH = 'YOUTUBE_SEARCH';
export const ADD_LECTURE_VIDEO = 'ADD_LECTURE_VIDEO';

interface State {
  recentSearches: Set<string>;
  searchResults: YoutubeClipItem[];
  searchLoading: boolean;
  lectureVideos: LectureVideo[],
}

export const youtubeStore = new Store<State>({
  state: {
    recentSearches: recentSearchesService.getSearches(),
    searchResults: [],
    searchLoading: false,
    lectureVideos: lectureVideoService.fetchLectureVideos(),
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

    [SET_LECTURE_VIDEOS] (state: State, lectureVideos: LectureVideo[]) {
      state.lectureVideos = lectureVideos;
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
    },

    [ADD_LECTURE_VIDEO] ({ commit }, youtubeClipItem: YoutubeClipItem) {
      lectureVideoService.addLectureVideos(youtubeClipItem);
      commit(SET_LECTURE_VIDEOS, lectureVideoService.fetchLectureVideos());
    }
  },
});
