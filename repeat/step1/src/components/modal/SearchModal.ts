import {addEvent} from "~@core";
import {LectureVideo} from "~@domain";

export interface SearchModalProps {
  visibleModal: boolean;
  closeModal: () => void;
  recentSearches: Set<String>;
  addSearchKey: (key: string) => void;
  lectureVideos: LectureVideo[];
}

export const SearchModal = ({
  visibleModal,
  closeModal,
  recentSearches,
  lectureVideos,
}: SearchModalProps) => {

  addEvent('.modal-close', 'click', closeModal);

  return `
    <div class="modal ${visibleModal ? 'open' : 'close'}">
      <div class="modal-inner p-8">
        <button class="modal-close">
          <svg viewbox="0 0 40 40">
            <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
          </svg>
        </button>
        <header>
          <h2 class="text-center">🔎 유튜브 검색</h2>
        </header>
        <form class="d-flex">
          <input type="text" class="w-100 mr-2 pl-2" placeholder="검색" />
          <button type="button" class="btn bg-cyan-500">검색</button>
        </form>
        <section class="mt-2">
          <span class="text-gray-700">최근 검색어: </span>
          ${[ ...recentSearches ].map(searchKey => `
            <a class="chip">${searchKey}</a>
          `).join('')}
          ${recentSearches.size === 0 ? '최근 검색 내역이 존재하지 않습니다.' : ''}
        </section>
        <section>
          <div class="d-flex justify-end text-gray-700">
            저장된 영상 갯수: ${lectureVideos.length}개
          </div>
          <section class="video-wrapper">
            <article class="clip">
              <div class="preview-container">
                <iframe
                  width="100%"
                  height="118"
                  src="https://www.youtube.com/embed/Ngj3498Tm_0"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowfullscreen
                ></iframe>
              </div>
              <div class="content-container pt-2 px-1">
                <h3>아두이노 무드등</h3>
                <div>
                  <a
                    href="https://www.youtube.com/channel/UC-mOekGSesms0agFntnQang"
                    target="_blank"
                    class="channel-name mt-1"
                  >
                    메이커준
                  </a>
                  <div class="meta">
                    <p>2021년 3월 2일</p>
                  </div>
                  <div class="d-flex justify-end">
                    <button class="btn">⬇️ 저장</button>
                  </div>
                </div>
              </div>
            </article>
          </section>
        </section>
      </div>
    </div>
  `;
}
