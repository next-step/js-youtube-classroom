import { createNode } from '../domHelper';
import { CommonProps, Component } from '../types';

interface Props extends CommonProps {
  thumbnailUrl: string;
  title: string;
  channelName: string;
  channelId: string;
  registeDate: string;
}

const Video: Component<Props> = ({ thumbnailUrl, channelName, channelId, registeDate, title }) => {
  const $video = createNode(`
    <article class="clip">
      <div class="preview-container">
        <iframe
          width="100%"
          height="118"
          src="${thumbnailUrl}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
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
          <div>
            <span class="opacity-hover">✅</span>
            <span class="opacity-hover">👍</span>
            <span class="opacity-hover">💬</span>
            <span class="opacity-hover">🗑️</span>
          </div>
        </div>
      </div>
    </article>
  `);

  return $video;
};

export default Video;
