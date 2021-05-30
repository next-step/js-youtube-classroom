import {Component} from "~_core/Component";
import {YoutubeClipItem} from "~domain";

export enum VideoClipType {
  SEARCH = 'SEARCH',
  CONTENT = 'CONTENT',
}

interface VideoClipProps {
  type: VideoClipType;
  item: YoutubeClipItem;
}

export class VideoClip extends Component<{}, VideoClipProps> {

  private get footer () {
    const { type } = this.$props;
    return type === VideoClipType.SEARCH ? `
      <div class="d-flex justify-end">
        <button class="btn">⬇️ 저장</button>
      </div>
    ` : `
      <div>
        <span class="opacity-hover">✅</span>
        <span class="opacity-hover">👍</span>
        <span class="opacity-hover">💬</span>
        <span class="opacity-hover">🗑️</span>
      </div>
    `;
  }

  protected template(): string {
    const { item } = this.$props;
    return `
      <div class="preview-container">
        <iframe
          width="100%"
          height="118"
          src="https://www.youtube.com/embed/${item.id.videoId}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          loading="lazy"
          allowfullscreen
        ></iframe>
      </div>
      <div class="content-container pt-2 px-1">
        <h3>${item.snippet.title}</h3>
        <div>
          <a
            href="https://www.youtube.com/channel/${item.snippet.channelId}"
            target="_blank"
            class="channel-name mt-1"
          >
            ${item.snippet.channelTitle}
          </a>
          <div class="meta">
            <p>${item.snippet.publishedAt}</p>
          </div>
        </div>
        ${this.footer}
      </div>
    `;
  }
}