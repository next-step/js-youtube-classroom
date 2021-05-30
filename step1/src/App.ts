import {Component} from "~_core/Component";
import {Header} from "~components/Header";
import {YoutubeSearchModal} from "~components/YoutubeSearchModal";
import {VideoClip, VideoClipType} from "~components/VideoClip";

export class App extends Component {
  template () {
    return `
      <div class="d-flex justify-center mt-5 w-100">
        <div class="w-100">
          <header class="my-4" data-component="Header"></header>
          <main class="mt-10">
            <section class="video-wrapper">
              <article class="clip" data-component="VideoClip"></article>
            </section>
          </main>
        </div>
      </div>
      <div class="modal" data-component="YoutubeSearchModal"></div>
    `;
  }

  public initChildComponent(el: HTMLElement, componentName: string) {
    if (componentName === 'Header') {
      return new Header(el, {
        modalOpen: () => {
          const $modal = this.$components.YoutubeSearchModal as YoutubeSearchModal;
          $modal.open();
        }
      });
    }

    if (componentName === 'YoutubeSearchModal') {
      return new YoutubeSearchModal(el);
    }

    if (componentName === 'VideoClip') {
      return new VideoClip(el, {
        type: VideoClipType.CONTENT
      });
    }
  }
}