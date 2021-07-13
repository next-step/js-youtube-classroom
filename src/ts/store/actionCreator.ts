import { Action, YoutubeVideo } from '../types';
import {
  YOUTUBE_SEARCH_ERROR,
  YOUTUBE_SEARCH_LOADING,
  YOUTUBE_SEARCH_SUCCESS,
  MODAL_OPEN,
  MODAL_CLOSE,
  YOUTUBE_FETCH_MORE_SUCCESS,
} from './actionType';

export const searchYoutubeLoadingAction = (): Action => ({
  type: YOUTUBE_SEARCH_LOADING,
});

export const searchYoutubeSuccessAction = (
  searchList: YoutubeVideo[],
  currentSearchInfo: {
    nextPageToken: string;
    keyword: string;
  }
): Action => {
  window.localStorage.setItem('searchList', JSON.stringify(searchList));
  return {
    type: YOUTUBE_SEARCH_SUCCESS,
    payload: { searchList, currentSearchInfo },
  };
};

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
