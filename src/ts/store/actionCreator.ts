import { Action, YoutubeVideo } from '../types';
import {
  YOUTUBE_SEARCH_ERROR,
  YOUTUBE_SEARCH_LOADING,
  YOUTUBE_SEARCH_SUCCESS,
  MODAL_OPEN,
  MODAL_CLOSE,
} from './actionType';

export const searchYoutubeLoadingAction = (): Action => ({
  type: YOUTUBE_SEARCH_LOADING,
});

export const searchYoutubeSuccessAction = (searchList: YoutubeVideo[]): Action => ({
  type: YOUTUBE_SEARCH_SUCCESS,
  payload: { searchList },
});

export const searchYoutubeErrorAction = (): Action => ({
  type: YOUTUBE_SEARCH_ERROR,
});

export const modalOpenAction = (): Action => ({
  type: MODAL_OPEN,
});

export const modalCloseAction = (): Action => ({
  type: MODAL_CLOSE,
});
