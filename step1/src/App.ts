import {Component} from "~@core";
import {Header} from "~components/Header";
import {YoutubeSearchModal} from "~components/YoutubeSearchModal";
import {VideoClip, VideoClipType} from "~components/VideoClip";
import {youtubeStore} from "~stores";
import {Message} from "~components/Message";

export class App extends Component {
  template () {
    return `
      <div class="d-flex justify-center mt-5 w-100">
        <div class="w-100">
          <header class="my-4" data-component="Header"></header>
          <main class="mt-10">
            <section class="video-wrapper">
              ${youtubeStore.$state.lectureVideos.map((video, key) => `
                <article class="clip" data-component="VideoClip" data-key="${key}"></article>
              `).join('')} 
            </section>
          </main>
        </div>
      </div>
      <div class="modal" data-component="YoutubeSearchModal"></div>
      <div class="messages" data-component="Message"></div>
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
      const key = Number(el.dataset.key);
      return new VideoClip(el, {
        type: VideoClipType.CONTENT,
        item: youtubeStore.$state.lectureVideos[key].item,
      });
    }

    if (componentName === 'Message') {
      return new Message(el);
    }
  }
}