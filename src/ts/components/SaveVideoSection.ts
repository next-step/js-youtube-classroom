import { createNode } from '../domHelper';
import store from '../store';
import { videoDeleteAction } from '../store/actionCreator';
import { Component } from '../types';
import { LOCAL_SAVE_VIDEO_LIST } from '../utils/localStorageKey';

interface Props {
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

  const $saveVideoSection = createNode('<section class="video-wrapper"></section>', children);

  $saveVideoSection.addEventListener('click', onDeleteVideoHandler);

  return $saveVideoSection;
};

export default SaveVideoSection;
