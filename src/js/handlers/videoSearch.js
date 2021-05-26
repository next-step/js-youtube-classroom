import { initInfiniteScroll, searchVideo } from "../service.js";
import { latestKeywords } from "../states/latestKeywords.js";

export async function handleVideoSearch(e) {
  e.preventDefault();

  const keyword = e.target.elements["video-search-input"].value;
  latestKeywords.add(keyword);

  const resultItems = await searchVideo(keyword);
  if (resultItems.length) {
    initInfiniteScroll();
  }
}
