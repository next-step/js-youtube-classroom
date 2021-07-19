import store from '../store';
import { createNode } from '../domHelper';
import { CommonProps, Component } from '../types';
import { EmptyMessage, SaveVideoSection, Video } from '../components';

interface Props extends CommonProps {}

const ToWatch: Component<Props> = () => {
  const { saveVideoList } = store.getState();

  const toWatchVideoList = saveVideoList.filter(saveVideo => !saveVideo.isWatched);

  const $toWatch = createNode('<main class="mt-10"></main>', [
    SaveVideoSection({
      children: toWatchVideoList.length
        ? toWatchVideoList.map((video, index) => {
            return Video({
              type: 'save',
              channelId: video.snippet.channelId,
              channelName: video.snippet.channelTitle,
              publishTime: video.snippet.publishTime,
              videoId: video.id.videoId,
              title: video.snippet.title,
              index,
              isSave: true,
              isWatched: video.isWatched,
              isLike: video.isLike,
            });
          })
        : [EmptyMessage({ message: '볼 영상이 없습니다 :(' })],
    }),
  ]);

  return $toWatch;
};

export default ToWatch;
