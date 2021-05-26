import { search } from "../viewControllers/searchModal.js";

export function handleLatestKeywordSearch({ target }) {
  if (!target.classList.contains("js-latest-keyword")) return;

  const latestKeyword = target.innerText;

  search(latestKeyword);
}
