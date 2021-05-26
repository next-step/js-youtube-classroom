import {Component} from "~_core/Component";

export class App extends Component {
  template () {
    return `
      <div class="d-flex justify-center mt-5 w-100">
        <div class="w-100">
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
          <main class="mt-10">
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
                    <div>
                      <span class="opacity-hover">✅</span>
                      <span class="opacity-hover">👍</span>
                      <span class="opacity-hover">💬</span>
                      <span class="opacity-hover">🗑️</span>
                    </div>
                  </div>
                </div>
              </article>
            </section>
          </main>
        </div>
      </div>
      <div class="modal">
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
            <a class="chip">메이커준</a>
            <a class="chip">블랙커피</a>
            <a class="chip">자바스크립트</a>
          </section>
          <section>
            <div class="d-flex justify-end text-gray-700">
              저장된 영상 갯수: 50개
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

  public setEvent() {
    const $searchButton: HTMLElement = document.querySelector("#search-button")!;
    const $modalClose: HTMLElement = document.querySelector(".modal-close")!;
    const $modal: HTMLElement = document.querySelector(".modal")!;

    const onModalShow = () => {
      $modal.classList.add("open");
    };

    const onModalClose = () => {
      $modal.classList.remove("open");
    };

    $searchButton.addEventListener("click", onModalShow);
    $modalClose.addEventListener("click", onModalClose);
  }
}