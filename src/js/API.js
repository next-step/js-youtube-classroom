import { YOUTUBE_BASE_URL } from "./constants/API.js";
import { FETCH_VIDEO_COUNT } from "./constants/classroom.js";

export function fetchSearchResult(keyword, nextPageToken = "") {
  const query = `part=snippet&order=viewCount&maxResults=${FETCH_VIDEO_COUNT}&pageToken=${nextPageToken}&q=${keyword}`;

  return fetch(`${YOUTUBE_BASE_URL}/search?${query}`)
    .then((data) => data.json())
    .catch((e) => console.error(e));
}
