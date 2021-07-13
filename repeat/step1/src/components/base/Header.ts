import {addEvent} from "~@core";

export const Header = () => {

  addEvent('#search-button', 'click', (e) => {
    console.log('test');
  });

  return `
    <header class="my-4">
      <h2 class="text-center font-bold">👩🏻‍💻 나만의 유튜브 강의실 👨🏻‍💻</h2>
      <nav class="d-flex justify-center">
        <button class="btn bg-cyan-100 mx-1">👁️ 볼 영상</button>
        <button class="btn mx-1">✅ 본 영상</button>
        <button id="search-button" class="btn mx-1">
          🔍 동영상 검색
        </button>
      </nav>
    </header>
  `
}
