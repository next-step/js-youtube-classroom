import customAxios from './customAxios';

const { YOUTUBE_API_KEY } = process.env;

console.log(YOUTUBE_API_KEY);

const searchYoutubeByTitle = async () => {
  const res = await customAxios.get(`/search?key=${YOUTUBE_API_KEY}`);
  return await res.data;
};

const youtubeAPI = {
  searchYoutubeByTitle,
};

export default youtubeAPI;
