import { Action } from '../types';
import { YOUTUBE_SEARCH_ERROR, YOUTUBE_SEARCH_LOADING, YOUTUBE_SEARCH_SUCCESS } from './actionType';

export const searchYoutubeLoadingAction = (): Action => ({
  type: YOUTUBE_SEARCH_LOADING,
});

export const searchYoutubeSuccessAction = (): Action => ({
  type: YOUTUBE_SEARCH_SUCCESS,
});

export const searchYoutubeErrorAction = (): Action => ({
  type: YOUTUBE_SEARCH_ERROR,
});
