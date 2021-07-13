import {YoutubeClipItem} from "~@domain";
import {dateformat} from "~utils";

export interface SearchModalVideosProps {
  videos: YoutubeClipItem[];
}

export const SearchModalVideos = ({
  videos
}: SearchModalVideosProps) => {

  return `
    <section class="video-wrapper">
      ${videos.map(({ id, snippet }) => `
        <article class="clip">
          <div class="preview-container">
            <iframe
              width="100%"
              height="118"
              src="https://www.youtube.com/embed/${id.videoId}"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              loading="lazy"
            ></iframe>
          </div>
          <div class="content-container pt-2 px-1">
            <h3>${snippet.title}</h3>
            <div>
              <a
                href="https://www.youtube.com/channel/${snippet.channelId}"
                target="_blank"
                class="channel-name mt-1"
              >
                ${snippet.channelTitle}
              </a>
              <div class="meta">
                <p>${dateformat(snippet.publishedAt)}</p>
              </div>
              <div class="d-flex justify-end">
                <button class="btn">⬇️ 저장</button>
              </div>
            </div>
          </div>
        </article>
      `).join('')}
    </section>
  `;
}
