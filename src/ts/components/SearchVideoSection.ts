import { createNode } from '../domHelper';
import store from '../store';
import { CommonProps, Component, GlobalState, YoutubeVideo } from '../types';
import Video from './Video';

interface Props extends CommonProps {}

const SearchVideoSection: Component<Props> = ({}) => {
  const { searchList } = store.getState();
  console.log(searchList);

  const $searchVideoSection = createNode('<section></section>', [
    createNode(
      `<div class="d-flex justify-end text-gray-700">저장된 영상 갯수: ${searchList.length}개</div>`
    ),
    createNode(
      `<section class="video-wrapper"></section>`,
      searchList.map(video =>
        Video({
          type: 'search',
          channelId: video.snippet.channelId,
          channelName: video.snippet.channelTitle,
          registeDate: video.snippet.publishTime,
          videoId: video.id.videoId,
          title: video.snippet.title,
        })
      )
    ),
  ]);

  return $searchVideoSection;
};

export default SearchVideoSection;
