import { Navigations } from "@/types/index";
import { FILTER_ID } from "@/constants/index";

const selected = `btn bg-cyan-100 mx-1`;
const unSelected = `btn mx-1`;

const template = (filter: Navigations): string => {
  return `
    <h2 class="text-center font-bold">👩🏻‍💻 나만의 유튜브 강의실 👨🏻‍💻</h2>
    <nav class="d-flex justify-center" id="navigation">
        <button class="${
          filter === FILTER_ID.later ? selected : unSelected
        }" id="later">👁️ 볼 영상</button>
        <button class="${
          filter === FILTER_ID.watched ? selected : unSelected
        }" id="watched">✅ 본 영상</button>
        <button
          id="liked"
          class="${filter === FILTER_ID.liked ? selected : unSelected}">
          👍🏻 좋아요 한 영상
         </button>
        <button id="search-button" class="${
          filter === "search-button" ? selected : unSelected
        }">
        🔍
        </button>
    </nav>
    `;
};

export default template;
