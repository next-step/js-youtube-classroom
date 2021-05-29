import { Navigations } from "@/types/index";

const selected = `btn bg-cyan-100 mx-1`;
const unSelected = `btn mx-1`;

const template = (filter: Navigations): string => {
  return `
    <h2 class="text-center font-bold">👩🏻‍💻 나만의 유튜브 강의실 👨🏻‍💻</h2>
    <nav class="d-flex justify-center" id="navigation">
        <button class="${
          filter === "later" ? selected : unSelected
        }" id="later">👁️ 볼 영상</button>
        <button class="${
          filter === "watched" ? selected : unSelected
        }" id="watched">✅ 본 영상</button>
        <button id="search-button" class="${
          filter === "search-button" ? selected : unSelected
        }">
        🔍 동영상 검색
        </button>
    </nav>
    `;
};

export default template;
