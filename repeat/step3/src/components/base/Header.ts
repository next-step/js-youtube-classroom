import {addEvent} from "~@core";
import {router} from "~router";

export interface HeaderProps {
  openModal: () => void;
}

export const Header = ({ openModal }: HeaderProps) => {

  addEvent('#search-button', 'click', () => {
    openModal();
  });

  return `
    <header class="my-4">
      <h2 class="text-center font-bold">👩🏻‍💻 나만의 유튜브 강의실 👨🏻‍💻</h2>
      <nav class="d-flex justify-center">
      
        <a href="/#!" class="btn ${router.path === '/' ? 'bg-cyan-100' : ''} mx-1">
          👁️ 볼 영상
        </a>
        
        <a href="/#!/viewed" class="btn ${router.path === '/viewed' ? 'bg-cyan-100' : ''} mx-1">
          ✅ 본 영상
        </a>
        
        <a href="/#!/liked" class="btn ${router.path === '/liked' ? 'bg-cyan-100' : ''} mx-1">
          👍 좋아요 한 영상
        </a>
        
        <button id="search-button" class="btn mx-1">
          🔍 동영상 검색
        </button>
        
      </nav>
    </header>
  `;

}
