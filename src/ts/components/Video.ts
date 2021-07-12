import { createNode } from '../domHelper';
import { CommonProps, Component } from '../types';

interface Props extends CommonProps {
  videoId: string;
  title: string;
  channelName: string;
  channelId: string;
  registeDate: string;
  type: 'search' | 'save';
}

const Video: Component<Props> = ({
  videoId,
  channelName,
  channelId,
  registeDate,
  title,
  type = 'save',
}) => {
  const $video = createNode(`
    <article class="clip">
      <div class="preview-container">
        <iframe
          width="100%"
          height="118"
          src="https://www.youtube.com/embed/${videoId}"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen >
        </iframe>
      </div>
      <div class="content-container pt-2 px-1">
        <h3>${title}</h3>
        <div>
          <a
            href="https://www.youtube.com/channel/${channelId}"
            target="_blank"
            class="channel-name mt-1"
          >
            ${channelName}
          </a>
          <div class="meta">
            <p>${registeDate}</p>
          </div>
          ${
            type === 'save'
              ? `
          <div>
            <span class="opacity-hover">✅</span>
            <span class="opacity-hover">👍</span>
            <span class="opacity-hover">💬</span>
            <span class="opacity-hover">🗑️</span>
          </div>`
              : `
          <div class="d-flex justify-end">
            <button class="btn">⬇️ 저장</button>
          </div>
          `
          }
        </div>
      </div>
    </article>
  `);

  return $video;
};

export default Video;
