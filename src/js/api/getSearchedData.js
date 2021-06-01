import axios from 'axios';
import { renderNoResult } from 'utils/renderingUtils';

const getSearchedData = async (value, SHOWED_RESULTS_NUMBER, nextPageToken) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${SHOWED_RESULTS_NUMBER}&q=${value}&key=${
        process.env.YOUTUBE_API_KEY_3
      }${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`
    );
    return response;
  } catch (e) {
    const $videoWrapper = document.querySelector('.modal .video-wrapper');
    renderNoResult(
      $videoWrapper,
      '검색 도중 에러가 났어요ㅜㅜ 얼릉 고치고 돌아올게요'
    );
    throw Error(e);
  }
};

export default getSearchedData;
