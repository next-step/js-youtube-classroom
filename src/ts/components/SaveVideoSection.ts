import { createNode } from '../domHelper';
import store from '../store';
import {
  likeToggleAction,
  snackBarHideAction,
  snackBarShowAction,
  videoDeleteAction,
  watchedToggleAction,
} from '../store/actionCreator';
import { CommonProps, Component } from '../types';
import debounce from '../utils/debounce';
import { LOCAL_SAVE_VIDEO_LIST } from '../utils/localStorageKey';

interface Props extends CommonProps {
  children: Element[];
}

const SaveVideoSection: Component<Props> = ({ children }) => {
  const { dispatch, getState } = store;

  const onDeleteVideoHandler = (videoId: string) => {
    if (!confirm('정말 삭제하시겠습니까?')) return;
    dispatch(videoDeleteAction(videoId));
    dispatch(snackBarShowAction('영상이 삭제되었습니다 :)'));
  };

  const onWatchedToggleHandler = (videoId: string) => {
    dispatch(watchedToggleAction(videoId));
    const { saveVideoList } = getState();
    const currentVideoIndex = saveVideoList.findIndex(
      saveVideo => saveVideo.id.videoId === videoId
    );

    if (!currentVideoIndex) return;

    const selectVideo = saveVideoList[currentVideoIndex];

    dispatch(
      snackBarShowAction(
        selectVideo.isWatched ? '본 영상으로 변경되었습니다 :)' : '볼 영상으로 변경되었습니다 :)'
      )
    );
  };

  const onLikeToggleHandler = (videoId: string) => {
    dispatch(likeToggleAction(videoId));
    const { saveVideoList } = getState();
    window.localStorage.setItem(LOCAL_SAVE_VIDEO_LIST, JSON.stringify(saveVideoList));
    const currentVideoIndex = saveVideoList.findIndex(
      saveVideo => saveVideo.id.videoId === videoId
    );
    const selectVideo = saveVideoList[currentVideoIndex];

    dispatch(
      snackBarShowAction(
        selectVideo.isLike
          ? '좋아하는 영상 리스트에 추가했습니다 :)'
          : '좋아하는 영상 리스트에서 삭제했습니다 :)'
      )
    );
  };

  const onChangeVideoStateHandlers = (() => {
    const resetSnackBarDeleteTime = debounce(() => dispatch(snackBarHideAction()), 2500);
    return ({ target }) => {
      const { videoId } = target.parentNode.dataset;

      if (target.matches('.video-delete')) onDeleteVideoHandler(videoId);
      else if (target.matches('.video-watched')) onWatchedToggleHandler(videoId);
      else if (target.matches('.video-like')) onLikeToggleHandler(videoId);
      else return;

      const { saveVideoList } = getState();
      window.localStorage.setItem(LOCAL_SAVE_VIDEO_LIST, JSON.stringify(saveVideoList));
      resetSnackBarDeleteTime();
    };
  })();

  const $saveVideoSection = createNode('<section class="video-wrapper"></section>', children);

  $saveVideoSection.addEventListener('click', onChangeVideoStateHandlers);

  return $saveVideoSection;
};
// createNode메서드에 들어가는 인자값을 객체로 표현하여 return 후 컴포넌트 함수들을 모두 모아 createNode를 실행시켜주는 방법은 어떨까

export default SaveVideoSection;
