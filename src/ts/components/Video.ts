import { createNode } from '../domHelper';
import { Component } from '../types';

interface Props {
  src: string;
  title: string;
  channelName: string;
  channelUrl: string;
  registeDate: string;
}

const Video: Component<Props> = ({ src, channelName, channelUrl, registeDate, title }) => {
  const $video = createNode(`
    <article class="clip">
      <div class="preview-container">
        <iframe
          width="100%"
          height="118"
          src="${src}
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowfullscreen
        ></iframe>
      </div>
      <div class="content-container pt-2 px-1">
        <h3>${title}</h3>
        <div>
          <a
            href="${channelUrl}"
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
