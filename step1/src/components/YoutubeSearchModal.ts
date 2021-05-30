import {Component} from "~_core/Component";
import {RecentSearches} from "~components/RecentSearches";
import {VideoClip, VideoClipType} from "~components/VideoClip";

export class YoutubeSearchModal extends Component {



  protected template(): string {
    return `
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
        <section class="mt-2" data-component="RecentSearches"></section>
        <section>
          <div class="d-flex justify-end text-gray-700">
            저장된 영상 갯수: 50개
          </div>
          <section class="video-wrapper">
            <article class="clip" data-component="VideoClip"></article>
          </section>
        </section>
      </div>
    `;
  }

  protected initChildComponent(el: HTMLElement, componentName: string) {
    if (componentName === 'RecentSearches') {
      return new RecentSearches(el);
    }
    if (componentName === 'VideoClip') {
      return new VideoClip(el, {
        type: VideoClipType.SEARCH
      });
    }
  }

  public open () {
    this.$target.classList.add('open');
  }

  public close () {
    this.$target.classList.remove('open');
  }

  protected setEvent() {
    this.addEvent('click', '.modal-close', () => this.close());
  }
}
