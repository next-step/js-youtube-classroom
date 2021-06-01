import { Filter, ItemDB, Snippet } from "@/types/index";
import { FILTER_ID } from "@/constants/index";
import parseDate from "@/utils/parseDate";

const emptyClassRoom = `<div class="content-container pt-2 px-1">아직 아무 것도 없어요🙅🏼</div>`;

const videoArticle = (
  id: string,
  snippet: Snippet,
  liked: boolean,
  watched: boolean
) => `
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
            <span class="${
              watched && "opacity-hover"
            }" id="watch-toggler">✅</span>
            <span class="${
              liked && "opacity-hover"
            }" id="like-toggler">👍🏻</span>
            <span class="opacity-hover ml-2 js-delete-button" id="remove-button">🗑️</span>
            </div>
        </div>
    </div>
</article>
`;

const template = (filter: Filter, datas: ItemDB[]) => {
  const assignAction = {
    [FILTER_ID.watched]: (): ItemDB[] => {
      return datas.filter((data) => data.watched);
    },
    [FILTER_ID.later]: (): ItemDB[] => {
      return datas.filter((data) => !data.watched);
    },
    [FILTER_ID.liked]: (): ItemDB[] => {
      return datas.filter((data) => data.liked);
    },
  };
  return (
    assignAction[filter]()
      .map((videoData) =>
        videoArticle(
          videoData.data.id,
          videoData.data.snippet,
          videoData.liked,
          videoData.watched
        )
      )
      .join("") || emptyClassRoom
  );
};

export default template;
