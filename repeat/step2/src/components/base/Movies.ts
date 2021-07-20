import {LectureVideo} from "~@domain";
import {dateformat, selectParent} from "~utils";
import {addEvent} from "~@core";

export interface MoviesProps {
  videos: LectureVideo[];
  updateLectureVideo: (video: LectureVideo) => void;
  removeLectureVideo: (id: number) => void;
}

export const Movies = ({ videos, updateLectureVideo, removeLectureVideo }: MoviesProps) => {

  addEvent('.viewed', 'click', e => {
    const target = e.target as HTMLElement;
    const id = Number(selectParent('[data-id]', target).dataset.id);
    const video: LectureVideo = videos.find(v => v.id === id)!;
    updateLectureVideo({
      ...video,
      viewed: !video.viewed,
    });
  })

  addEvent('.liked', 'click', e => {
    const target = e.target as HTMLElement;
    const id = Number(selectParent('[data-id]', target).dataset.id);
    const video: LectureVideo = videos.find(v => v.id === id)!;
    updateLectureVideo({
      ...video,
      isLike: !video.isLike,
    });
  })

  addEvent('.remove', 'click', e => {
    const target = e.target as HTMLElement;
    const id = Number(selectParent('[data-id]', target).dataset.id);
    removeLectureVideo(id);
  })

  return `
    <section class="video-wrapper">
      ${videos.map(({ id, item, isLike, viewed }) => `
        <article class="clip" data-id="${id}">
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
                <span class="opacity-hover ${viewed ? 'active' : ''} viewed">✅</span>
                <span class="opacity-hover ${isLike ? 'active' : ''} liked">👍</span>
                <span class="opacity-hover comments">💬</span>
                <span class="opacity-hover remove">🗑️</span>
              </div>
            </div>
          </div>
        </article>
      `).join('')}
    </section>
  `
}