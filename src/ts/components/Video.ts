import { createNode } from '../domHelper';
import { CommonProps, Component } from '../types';
import transferCreationDate from '../utils/transferCreateData';

interface Props extends CommonProps {
  videoId: string;
  title: string;
  channelName: string;
  channelId: string;
  publishTime: string;
  type: 'search' | 'save';
  index: number;
  isSave: boolean;
  isWatched: boolean;
  isLike: boolean;
}

const Video: Component<Props> = ({
  videoId,
  channelName,
  channelId,
  publishTime,
  title,
  type = 'save',
  index,
  isSave,
  isWatched,
  isLike,
}) => {
  const publishDate = transferCreationDate(publishTime);

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
        <h3>
          <a
          href="https://www.youtube.com/watch?v=${videoId}"
          target="_blank"
          class="video-name"
          >${title}
          </a>
        </h3>
        <div>
          <a
            href="https://www.youtube.com/channel/${channelId}"
            target="_blank"
            class="channel-name mt-1"
          >
            ${channelName}
          </a>
          <div class="meta">
            <p>${publishDate}</p>
          </div>
          ${
            type === 'save'
              ? `
          <div data-video-id="${videoId}">
            <span class="video-watched${
              isWatched ? ' opacity-hover-liked' : ' opacity-hover'
            }">✅</span>
            <span class="video-like${isLike ? ' opacity-hover-liked' : ' opacity-hover'}">👍</span>
            <span class="opacity-hover video-comment">💬</span>
            <span class="opacity-hover video-delete">🗑️</span>
          </div>`
              : !isSave
              ? `
          <div class="d-flex justify-end">
            <button class="btn" data-index="${index}">⬇️ 저장</button>
          </div>
          `
              : ''
          }
        </div>
      </div>
    </article>
  `);

  return $video;
};

export default Video;
