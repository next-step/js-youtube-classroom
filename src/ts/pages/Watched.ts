import { EmptyMessage, SaveVideoSection, Video } from '../components';
import { createNode } from '../domHelper';
import store from '../store';
import { CommonProps, Component } from '../types';

interface Props extends CommonProps {}

const Watched: Component<Props> = () => {
  const { saveVideoList } = store.getState();

  const watchedVideoList = saveVideoList.filter(saveVideo => saveVideo.isWatched);

  const $watchedPage = createNode('<main class="mt-10"></main>', [
    SaveVideoSection({
      children: watchedVideoList.length
        ? watchedVideoList.map((video, index) => {
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
        : [EmptyMessage({ message: '본 영상이 없습니다 :(' })],
    }),
  ]);

  return $watchedPage;
};

export default Watched;
