import { createNode } from '../domHelper';
import store from '../store';
import { videoSaveAction } from '../store/actionCreator';
import { CommonProps, Component, GlobalState, YoutubeVideo } from '../types';
import { LOCAL_SAVE_VIDEO_LIST } from '../utils/localStorageKey';
import NotFound from './NotFound';
import Skeleton from './Skeleton';
import Video from './Video';

interface Props extends CommonProps {}

const SearchVideoSection: Component<Props> = ({}) => {
  const { searchList, isSearchLoading, saveVideoList } = store.getState();

  const onSaveVideoHandler = ({ target }) => {
    if (target.matches('.btn')) {
      const { searchList, saveVideoList } = store.getState();
      if (saveVideoList.length >= 100) {
        alert('비디오는 최대 100개까지만 저장할 수 있습니다.');
        return;
      }

      const selectIndex: string = target.dataset.index;
      const selectVideo: YoutubeVideo = searchList[selectIndex];

      store.dispatch(videoSaveAction(selectVideo));
      window.localStorage.setItem(
        LOCAL_SAVE_VIDEO_LIST,
        JSON.stringify([...saveVideoList, selectVideo])
      );
    }
  };

  const $searchVideoSection = createNode('<section></section>', [
    createNode(
      `<div class="d-flex justify-end text-gray-700">저장된 영상 갯수: ${saveVideoList.length} / 100</div>`
    ),
    createNode(
      `<section class="video-wrapper"></section>`,
      isSearchLoading
        ? Array.from({ length: 10 }, (_, i) => i).map(() => Skeleton({}))
        : searchList.length
        ? searchList.map((video, index) => {
            const isSave = !!saveVideoList.find(
              saveVideo => saveVideo.id.videoId === video.id.videoId
            );
            return Video({
              type: 'search',
              channelId: video.snippet.channelId,
              channelName: video.snippet.channelTitle,
              publishTime: video.snippet.publishTime,
              videoId: video.id.videoId,
              title: video.snippet.title,
              index,
              isSave,
              isWatched: video.isWatched,
            });
          })
        : [NotFound({})]
    ),
  ]);

  $searchVideoSection.addEventListener('click', onSaveVideoHandler);

  return $searchVideoSection;
};

export default SearchVideoSection;
