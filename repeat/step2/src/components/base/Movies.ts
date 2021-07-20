import {LectureVideo} from "~@domain";
import {dateformat} from "~utils";

export interface MoviesProps {
  videos: LectureVideo[];
}

export const Movies = ({ videos }: MoviesProps) => {
  return `
    <section class="video-wrapper">
      ${videos.map(({ id, item }) => `
        <article class="clip">
          <div class="preview-container">
            <iframe
              width="100%"
              height="118"
              src="https://www.youtube.com/embed/${item.id.videoId}"
              frameborder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowfullscreen
              loading="lazy"
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
                <p>${dateformat(item.snippet.publishedAt)}</p>
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
      `).join('')}
    </section>
  `
}