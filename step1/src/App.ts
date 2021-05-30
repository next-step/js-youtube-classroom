import {Component} from "~_core/Component";
import {Header} from "~components/Header";
import {YoutubeSearchModal} from "~components/YoutubeSearchModal";

export class App extends Component {
  template () {
    return `
      <div class="d-flex justify-center mt-5 w-100">
        <div class="w-100">
          <header class="my-4" data-component="Header"></header>
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
      <div class="modal" data-component="YoutubeSearchModal"></div>
    `;
  }

  public initChildComponent(
    target: HTMLElement,
    componentName: string
  ): Component | undefined {
    if (componentName === 'Header') {
      return new Header(target, {
        modalOpen: () => {
          this.$target.querySelector('.modal')!.classList.add('open');
        }
      });
    }

    if (componentName === 'YoutubeSearchModal') {
      return new YoutubeSearchModal(target, {
        modalClose: () => {
          this.$target.querySelector('.modal')!.classList.add('open');
        }
      });
    }
  }

  public setEvent() {
    this.addEvent('click', '.modal-close', () => {
      this.$target.querySelector(".modal")!.classList.remove("open");
    })
  }
}