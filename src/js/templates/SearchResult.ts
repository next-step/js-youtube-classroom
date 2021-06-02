import { Snippet, Item } from "@/types/index";
import {
  SAVE_BUTTON_CAPTION,
  UNSAVE_BUTTON_CAPTION,
  MAX_DATA_NUMBER,
} from "@/constants/index";
import parseDate from "@/utils/parseDate";

const videoArticle = (snippet: Snippet, id: string, isSaved?: boolean) => `
<article class="clip" data-id=${id}>
 <div class="preview-container">
    <iframe
    width="100%"
    height="118"
    src="https://www.youtube.com/embed/${id}"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
    ></iframe>
 </div>
 <div class="content-container pt-2 px-1">
    <h3>${snippet.title}</h3>
        <div>
            <a href="https://www.youtube.com/channel/${snippet.channelId}"
             target="_blank"
              class="channel-name mt-1"
             >
              ${snippet.channelTitle}
            </a>
            <div class="meta">
                <p>${parseDate(snippet.publishedAt)}</p>
            </div>
            <div class="d-flex justify-end">
                ${
                  isSaved
                    ? `<button class="btn" id="unsave">${UNSAVE_BUTTON_CAPTION}</button>`
                    : `<button class="btn" id="save">${SAVE_BUTTON_CAPTION}</button>`
                }
            </div>
        </div>
    </div>
</article>
`;

export const emptyState = `<image src="src/images/status/not_found.png"/>`;

const skeletonUI = `
<article class="clip">
  <div class="skeleton">
    <div class="image"></div>
      <p class="line"></p>
      <p class="line"></p>
    </div>
</article>
`;

export const loadingState = `
  ${skeletonUI}
  ${skeletonUI}
  ${skeletonUI}
  ${skeletonUI}
  ${skeletonUI}
  ${skeletonUI}
  ${skeletonUI}
  ${skeletonUI}
  ${skeletonUI}
  ${skeletonUI}
`;

const template = (datas: Item[], storedDatas: Set<string>) => `
${datas
  .map((data) => videoArticle(data.snippet, data.id, storedDatas.has(data.id)))
  .join("")}
`;

export default template;
