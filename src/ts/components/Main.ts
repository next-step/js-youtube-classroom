import { EmptyMessage } from '.';
import { createNode } from '../domHelper';
import store from '../store';
import { Component } from '../types';
import SaveVideoSection from './SaveVideoSection';
import Video from './Video';

interface Props {}

const Main: Component<Props> = ({}) => {
  const { saveVideoList } = store.getState();

  const $main = createNode('<main class="mt-10"></main>', [
    SaveVideoSection({
      children: saveVideoList.length
        ? saveVideoList.map((video, index) =>
            Video({
              type: 'save',
              channelId: video.snippet.channelId,
              channelName: video.snippet.channelTitle,
              publishTime: video.snippet.publishTime,
              videoId: video.id.videoId,
              title: video.snippet.title,
              index,
              isSave: true,
            })
          )
        : [EmptyMessage({ message: '저장된 영상이 없습니다 :(' })],
    }),
  ]);

  return $main;
};

export default Main;
