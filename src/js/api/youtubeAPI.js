import axios from 'axios';

const getSearchedData = async value => {
  try {
    const response = await axios.get(
      `https://www.googleapis.com/youtube/v3/search?part=snippet&maxResults=10&q=${value}&key=${process.env.YOUTUBE_API_KEY}`
    );
    return response;
  } catch (e) {
    throw Error(e);
  }
};

export default getSearchedData;
