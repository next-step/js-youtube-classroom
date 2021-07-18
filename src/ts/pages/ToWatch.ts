import store from '../store';
import { createNode } from '../domHelper';
import { CommonProps, Component } from '../types';
import { EmptyMessage, SaveVideoSection, Video } from '../components';

interface Props extends CommonProps {}

const ToWatch: Component<Props> = () => {
  const { saveVideoList } = store.getState();

  const $toWatch = createNode('<main class="mt-10"></main>', [
    SaveVideoSection({
      children: saveVideoList.length
        ? saveVideoList.map((video, index) => {
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
            });
          })
        : [EmptyMessage({ message: '저장된 영상이 없습니다 :(' })],
    }),
  ]);

  return $toWatch;
};

export default ToWatch;
