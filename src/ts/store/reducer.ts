import { Action, GlobalState, Reducer } from '../types';
import {
  LOCAL_CURRENT_SEARCH_INFO,
  LOCAL_RECENT_SEARCH_KEYWORDS,
  LOCAL_SAVE_VIDEO_LIST,
  LOCAL_SEARCH_LIST,
  LOCAL_CURRENT_PAGE,
} from '../utils/localStorageKey';
import {
  YOUTUBE_SEARCH_ERROR,
  YOUTUBE_SEARCH_LOADING,
  YOUTUBE_SEARCH_SUCCESS,
  MODAL_OPEN,
  MODAL_CLOSE,
  YOUTUBE_FETCH_MORE_SUCCESS,
  VIDEO_SAVE,
  VIDEO_DELETE,
  PAGE_CHANGE,
  WATCHED_TOGGLE,
  SNACKBAR_HIDE,
  SNACKBAR_SHOW,
} from './actionType';

const localSearchList = JSON.parse(window.localStorage.getItem(LOCAL_SEARCH_LIST));
const localSaveVideoList = JSON.parse(window.localStorage.getItem(LOCAL_SAVE_VIDEO_LIST));
const localRecentSearchKeywords = JSON.parse(
  window.localStorage.getItem(LOCAL_RECENT_SEARCH_KEYWORDS)
);
const localcurrentSearchInfo = JSON.parse(window.localStorage.getItem(LOCAL_CURRENT_SEARCH_INFO));
const localcurrentPage = JSON.parse(window.localStorage.getItem(LOCAL_CURRENT_PAGE));

let INITIAL_STATE: GlobalState = {
  isSearchLoading: false,
  error: null,
  searchList: localSearchList ?? [],
  recentSearchKeywords: localRecentSearchKeywords ?? [],
  saveVideoList: localSaveVideoList ?? [],
  currentSearchInfo: localcurrentSearchInfo ?? {
    nextPageToken: '',
    keyword: '',
  },
  isModalOpen: false,
  snackbar: { isShow: false, message: '' },
  currentPath: window.location.pathname,
};

const reducer: Reducer = (
  state: GlobalState = INITIAL_STATE,
  action: Action = { type: null }
): GlobalState => {
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
    case VIDEO_DELETE:
      return {
        ...state,
        saveVideoList: state.saveVideoList.filter(
          saveVideo => saveVideo.id.videoId !== action.payload.videoId
        ),
      };
    case PAGE_CHANGE:
      return {
        ...state,
        currentPath: action.payload.path,
      };
    case WATCHED_TOGGLE:
      return {
        ...state,
        saveVideoList: state.saveVideoList.map(saveVideo => {
          return saveVideo.id.videoId === action.payload.videoId
            ? { ...saveVideo, isWatched: !saveVideo.isWatched }
            : saveVideo;
        }),
      };
    case SNACKBAR_SHOW:
      return {
        ...state,
        snackbar: { isShow: true, message: action.payload.message },
      };
    case SNACKBAR_HIDE:
      return {
        ...state,
        snackbar: INITIAL_STATE.snackbar,
      };
    default:
      return state;
  }
};

export default reducer;
