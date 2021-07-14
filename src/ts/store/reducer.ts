import { Action, GlobalState, Reducer } from '../types';
import {
  YOUTUBE_SEARCH_ERROR,
  YOUTUBE_SEARCH_LOADING,
  YOUTUBE_SEARCH_SUCCESS,
  MODAL_OPEN,
  MODAL_CLOSE,
  YOUTUBE_FETCH_MORE_SUCCESS,
  VIDEO_SAVE,
} from './actionType';

const localSearchList = JSON.parse(window.localStorage.getItem('searchList'));
const localSaveVideoList = JSON.parse(window.localStorage.getItem('saveVideoList'));
const localrecentSearchKeywords = JSON.parse(window.localStorage.getItem('recentSearchKeywords'));

let INITIAL_STATE: GlobalState = {
  isSearchLoading: false,
  error: null,
  searchList: localSearchList ?? [],
  recentSearchKeywords: localrecentSearchKeywords ?? [],
  saveVideoList: localSaveVideoList ?? [],
  currentSearchInfo: {
    nextPageToken: '',
    keyword: '',
  },
  isModalOpen: false,
};

const reducer: Reducer = (state: GlobalState = INITIAL_STATE, action: Action): GlobalState => {
  switch (action.type) {
    case YOUTUBE_SEARCH_LOADING:
      return {
        ...state,
        isSearchLoading: true,
      };
    case YOUTUBE_SEARCH_SUCCESS:
      return {
        ...state,
        isSearchLoading: false,
        searchList: action.payload.searchList,
        currentSearchInfo: action.payload.currentSearchInfo,
        recentSearchKeywords: action.payload.newRecentSearchKeywords,
      };
    case YOUTUBE_SEARCH_ERROR:
      return {
        ...state,
        isSearchLoading: false,
        error: action.payload.error,
      };
    case YOUTUBE_FETCH_MORE_SUCCESS:
      return {
        ...state,
        isSearchLoading: false,
        searchList: [...state.searchList, ...action.payload.searchList],
        currentSearchInfo: action.payload.currentSearchInfo,
      };
    case MODAL_OPEN:
      return {
        ...state,
        isModalOpen: true,
      };
    case MODAL_CLOSE:
      return {
        ...state,
        isModalOpen: false,
      };
    case VIDEO_SAVE:
      return {
        ...state,
        saveVideoList: [...state.saveVideoList, action.payload.videoData],
      };
    default:
      return state;
  }
};

export default reducer;
