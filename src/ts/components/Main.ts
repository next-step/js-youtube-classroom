import { createNode } from '../domHelper';
import store from '../store';
import { Component } from '../types';
import SaveVideoSection from './SaveVideoSection';
import Video from './Video';

interface Props {}

const Main: Component<Props> = ({}) => {
  const state = store.getState();

  const $main = createNode('<main class="mt-10"></main>', [
    SaveVideoSection({
      children: state.saveVideoList.map(video =>
        Video({
          type: 'save',
          channelId: video.snippet.channelId,
          channelName: video.snippet.channelTitle,
          publishTime: video.snippet.publishTime,
          videoId: video.id.videoId,
          title: video.snippet.title,
        })
      ),
    }),
  ]);

  return $main;
};

export default Main;
