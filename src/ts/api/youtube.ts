import customAxios from './customAxios';

const { YOUTUBE_API_KEY } = process.env;
const MAX_RESULTS = 10;

const searchYoutubeByTitle = async (searchKeyword: string) => {
  const res = await customAxios.get(
    `/search?key=${YOUTUBE_API_KEY}&part=snippet&maxResults=${MAX_RESULTS}&q=${searchKeyword}&type=video`
  );
  return await res.data;
};

const nextPage = async (searchKeyword: string, nextPageToken: string) => {
  const res = await customAxios.get(
    `/search?key=${YOUTUBE_API_KEY}&part=snippet&maxResults=${MAX_RESULTS}&pageToken=${nextPageToken}&q=${searchKeyword}&type=video`
  );
  return await res.data;
};

const youtubeAPI = {
  searchYoutubeByTitle,
  nextPage,
};

export default youtubeAPI;
