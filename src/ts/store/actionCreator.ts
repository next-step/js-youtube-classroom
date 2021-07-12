import { Action } from '../types';
import {
  YOUTUBE_SEARCH_ERROR,
  YOUTUBE_SEARCH_LOADING,
  YOUTUBE_SEARCH_SUCCESS,
  INPUT_VALUE_CHANGE,
} from './actionType';

export const searchYoutubeLoadingAction = (): Action => ({
  type: YOUTUBE_SEARCH_LOADING,
});

export const searchYoutubeSuccessAction = (): Action => ({
  type: YOUTUBE_SEARCH_SUCCESS,
});

export const searchYoutubeErrorAction = (): Action => ({
  type: YOUTUBE_SEARCH_ERROR,
});

export const changeInputValueAction = (value: string): Action => ({
  type: INPUT_VALUE_CHANGE,
  payload: { value },
});
