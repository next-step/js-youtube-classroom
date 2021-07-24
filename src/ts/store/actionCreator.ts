import { Action, YoutubeVideo } from '../types';
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
  LIKE_TOGGLE,
} from './actionType';

export const searchYoutubeLoadingAction = (): Action => ({
  type: YOUTUBE_SEARCH_LOADING,
});

export const searchYoutubeSuccessAction = (
  searchList: YoutubeVideo[],
  currentSearchInfo: {
    nextPageToken: string;
    keyword: string;
  },
  newRecentSearchKeywords: string[]
): Action => ({
  type: YOUTUBE_SEARCH_SUCCESS,
  payload: { searchList, currentSearchInfo, newRecentSearchKeywords },
});

export const searchYoutubeErrorAction = (): Action => ({
  type: YOUTUBE_SEARCH_ERROR,
});

export const fetchMoreYoutubeSuccessAction = (
  searchList: YoutubeVideo[],
  currentSearchInfo: {
    nextPageToken: string;
    keyword: string;
  }
): Action => ({
  type: YOUTUBE_FETCH_MORE_SUCCESS,
  payload: { searchList, currentSearchInfo },
});

export const modalOpenAction = (): Action => ({
  type: MODAL_OPEN,
});

export const modalCloseAction = (): Action => ({
  type: MODAL_CLOSE,
});

export const videoSaveAction = (videoData: YoutubeVideo): Action => ({
  type: VIDEO_SAVE,
  payload: { videoData },
});

export const videoDeleteAction = (videoId: string): Action => ({
  type: VIDEO_DELETE,
  payload: { videoId },
});

export const pageChangeAction = (path: string): Action => ({
  type: PAGE_CHANGE,
  payload: { path },
});

export const watchedToggleAction = (videoId: string): Action => ({
  type: WATCHED_TOGGLE,
  payload: { videoId },
});

export const likeToggleAction = (videoId: string): Action => ({
  type: LIKE_TOGGLE,
  payload: { videoId },
});

export const snackBarShowAction = (message: string): Action => ({
  type: SNACKBAR_SHOW,
  payload: { message },
});

export const snackBarHideAction = (): Action => ({
  type: SNACKBAR_HIDE,
});
