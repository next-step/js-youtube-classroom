import axios from 'axios';

const YOUTUBE_URL = 'https://www.googleapis.com/youtube/v3/search';

const searchYoutube = async search => {
  try {
    const res = await axios.get(
      `${YOUTUBE_URL}?part=snippet&type=video&key=${process.env.YOUTUBE_API_KEY}&q=${search}&maxResults=10`
    );
    return res;
  } catch (e) {
    throw new Error(e);
  }
};

const api = {
  searchYoutube,
};

export default api;
