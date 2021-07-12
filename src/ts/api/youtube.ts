import customAxios from './customAxios';

const { YOUTUBE_API_KEY } = process.env;
const MAX_RESULT = 10;

const searchYoutubeByTitle = async (searchKeyword: string) => {
  const res = await customAxios.get(
    `/search?key=${YOUTUBE_API_KEY}&part=snippet&maxResults=${MAX_RESULT}&q=${searchKeyword}`
  );
  return await res.data;
};

const youtubeAPI = {
  searchYoutubeByTitle,
};

export default youtubeAPI;
