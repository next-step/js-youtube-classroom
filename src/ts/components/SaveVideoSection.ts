import { createNode } from '../domHelper';
import store from '../store';
import {
  snackBarHideAction,
  snackBarShowAction,
  videoDeleteAction,
  watchedToggleAction,
} from '../store/actionCreator';
import { CommonProps, Component } from '../types';
import { LOCAL_SAVE_VIDEO_LIST } from '../utils/localStorageKey';

interface Props extends CommonProps {
  children: Element[];
}

const SaveVideoSection: Component<Props> = ({ children }) => {
  const { dispatch, getState } = store;

  const onDeleteVideoHandler = ({ target }) => {
    if (!target.matches('.video-delete')) return;
    if (!confirm('정말 삭제하시겠습니까?')) return;

    const videoId = target.parentNode.dataset.videoId;

    dispatch(videoDeleteAction(videoId));
    window.localStorage.setItem(LOCAL_SAVE_VIDEO_LIST, JSON.stringify(getState().saveVideoList));
  };

  const onWatchedHandler = ({ target }) => {
    if (!target.matches('.video-watched')) return;

    const videoId = target.parentNode.dataset.videoId;

    dispatch(watchedToggleAction(videoId));
    window.localStorage.setItem(LOCAL_SAVE_VIDEO_LIST, JSON.stringify(getState().saveVideoList));
    dispatch(snackBarShowAction('본 영상으로 저장되었습니다 :)'));
    window.setTimeout(() => dispatch(snackBarHideAction()), 2500);
  };

  const $saveVideoSection = createNode('<section class="video-wrapper"></section>', children);

  $saveVideoSection.addEventListener('click', onDeleteVideoHandler);
  $saveVideoSection.addEventListener('click', onWatchedHandler);

  return $saveVideoSection;
};
// createNode메서드에 들어가는 인자값을 객체로 표현하여 return 후 컴포넌트 함수들을 모두 모아 createNode를 실행시켜주는 방법은 어떨까

export default SaveVideoSection;
