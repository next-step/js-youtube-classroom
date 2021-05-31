import axios from 'axios';

const getSearchedData = async (value, SHOWED_RESULTS_NUMBER, nextPageToken) => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=${SHOWED_RESULTS_NUMBER}&q=${value}&key=${
        process.env.YOUTUBE_API_KEY_2
      }${nextPageToken ? `&pageToken=${nextPageToken}` : ''}`
    );
    return response;
  } catch (e) {
    throw Error(e);
  }
};

export default getSearchedData;
