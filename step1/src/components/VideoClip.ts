import {Component} from "~_core/Component";

export enum VideoClipType {
  SEARCH = 'SEARCH',
  CONTENT = 'CONTENT',
}

interface VideoClipProps {
  type: VideoClipType
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
    return `
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
          ${this.footer}
        </div>
      </div>
    `;
  }
}