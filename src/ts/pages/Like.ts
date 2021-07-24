import { EmptyMessage, SaveVideoSection, Video } from '../components';
import { createNode } from '../domHelper';
import store from '../store';
import { CommonProps, Component } from '../types';

interface Props extends CommonProps {}

const Like: Component<Props> = () => {
  const { saveVideoList } = store.getState();

  const LikedVideoList = saveVideoList.filter(saveVideo => saveVideo.isLike);

  const $likePage = createNode('<main class="mt-10"></main>', [
    SaveVideoSection({
      children: LikedVideoList.length
        ? LikedVideoList.map((video, index) => {
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
        : [EmptyMessage({ message: '좋아요를 누른 영상이 없습니다 :(' })],
    }),
  ]);

  return $likePage;
};

export default Like;
