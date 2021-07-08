import { Modal } from '../components';
import { createNode } from '../domHelper';
import { Component } from '../types';

const Home: Component = () => {
  const $home = createNode(
    `
    <div class="d-flex justify-center mt-5 w-100">
      <div class="w-100">
        <header class="my-4">
          <h2 class="text-center font-bold">👩🏻‍💻 나만의 유튜브 강의실 👨🏻‍💻</h2>
          <nav class="d-flex justify-center">
            <button class="btn bg-cyan-100 mx-1">👁️ 볼 영상</button>
            <button class="btn mx-1">✅ 본 영상</button>
            <button id="search-button" class="btn mx-1">🔍 동영상 검색</button>
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
    </div>`,
    [Modal]
  );

  return $home;
};

export default Home;
