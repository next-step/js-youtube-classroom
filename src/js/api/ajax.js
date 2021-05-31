const { YOUTUBE_BASE_URL } = process.env;
const { YOUTUBE_API_KEY } = process.env;

const MAX_RESULTS = 10;

const ajax = {
  searchYoutubeByTitle(q) {
    return fetch(
      `${YOUTUBE_BASE_URL}/search?q=${q}&part=snippet&key=${YOUTUBE_API_KEY}&maxResults=${MAX_RESULTS}`
    );
  },
  nextPage(q, nextPageToken) {
    return fetch(
      `${YOUTUBE_BASE_URL}/search?q=${q}&part=snippet&key=${YOUTUBE_API_KEY}&maxResults=${MAX_RESULTS}&pageToken=${nextPageToken}`
    );
  },
};

export default ajax;
