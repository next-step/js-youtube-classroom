import {Component} from "~_core";
import {RecentSearches} from "~components/RecentSearches";
import {VideoClip, VideoClipType} from "~components/VideoClip";
import {YOUTUBE_SEARCH, youtubeStore} from "~stores";
import {Skeleton} from "~components/Skeleton";
import notFound from '../assets/images/status/not_found.png';

interface State {
  searchKey: string;
}

export class YoutubeSearchModal extends Component<State> {

  setup() {
    this.$state = {
      searchKey: ''
    }
  }

  protected template(): string {
    const { searchResults, searchLoading } = youtubeStore.$state;

    return `
      <span class="middle"></span><div class="modal-inner p-8">
        <button class="modal-close">
          <svg viewbox="0 0 40 40">
            <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
          </svg>
        </button>
        <header>
          <h2 class="text-center">🔎 유튜브 검색</h2>
        </header>
        <form class="d-flex searchFrm">
          <input type="text" name="q" class="w-100 mr-2 pl-2" placeholder="검색" value="${this.$state.searchKey}" />
          <button type="submit" class="btn bg-cyan-500">검색</button>
        </form>
        <section class="mt-2" data-component="RecentSearches"></section>
        <section>
          <div class="d-flex justify-end text-gray-700">
            저장된 영상 갯수: 0/100 개
          </div>
          ${searchLoading ? `
            <div data-component="Skeleton"></div>
          ` : `
            <section class="video-wrapper">
              ${searchResults.map((item, key) => `
                <article class="clip" data-component="VideoClip" data-key="${key}"></article>
              `).join('')}
              
              ${!searchLoading && searchResults.length === 0 ? `
                <div>
                  <img src="${notFound}" alt="검색 결과가 없습니다." width="100" />
                  <p>검색 결과가 없습니다.</p>
                </div>
              ` : ''} 
            </section>
          `}
        </section>
      </div>
    `;
  }

  protected initChildComponent(el: HTMLElement, componentName: string) {

    const { searchResults, recentSearches } = youtubeStore.$state;

    if (componentName === 'RecentSearches') {
      return new RecentSearches(el, {
        items: [ ...recentSearches ],
        search: this.search.bind(this),
      });
    }

    if (componentName === 'VideoClip') {
      const itemKey = Number(el.dataset.key)
      return new VideoClip(el, {
        type: VideoClipType.SEARCH,
        item: searchResults[itemKey],
      });
    }

    if (componentName === 'Skeleton') {
      return new Skeleton(el, { count: 8 });
    }

  }

  public open () {
    this.$target.classList.add('open');
  }

  public close () {
    this.$target.classList.remove('open');
  }

  public async search (q: string) {
    this.$state.searchKey = q;
    try {
      await youtubeStore.dispatch(YOUTUBE_SEARCH, q);
    } catch (e) {
      console.error(e);
    }
  }

  protected setEvent() {
    this.addEvent('click', '.modal-close', () => this.close());

    this.addEvent('submit', '.searchFrm', async (event: Event) => {
      event.preventDefault();
      const { q } = event.target as HTMLFormElement;
      this.search(q.value);
    })
  }
}
