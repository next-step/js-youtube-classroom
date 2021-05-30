import { Snippet } from "@/types/index";
import parseDate from "@/utils/parseDate";

const videoArticle = (snippet: Snippet, id: string, isSaved: boolean) => `
<article class="clip">
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
                    ? '<button class="btn">⬇️ 저장</button>'
                    : "<span>저장됨</span>"
                }
            </div>
        </div>
    </div>
</article>
`;

const sampleSnippet = {
  publishedAt: "2021-05-10T09:02:33Z",
  channelId: "UCEf_Bc-KVd7onSeifS3py9g",
  title: "NCT DREAM 엔시티 드림 &#39;맛 (Hot Sauce)&#39; MV",
  description:
    "[Tracklist] 01 맛 (Hot Sauce) 02 Diggity 03 고래 (Dive Into You) 04 우리의 계절 (My Youth) 05 Rocket 06 Countdown (3, 2, 1) 07 ANL 08 주인공 (Irreplaceable) 09 ...",
  thumbnails: {
    default: {
      url: "https://i.ytimg.com/vi/PkKnp4SdE-w/default.jpg",
      width: 120,
      height: 90,
    },
    medium: {
      url: "https://i.ytimg.com/vi/PkKnp4SdE-w/mqdefault.jpg",
      width: 320,
      height: 180,
    },
    high: {
      url: "https://i.ytimg.com/vi/PkKnp4SdE-w/hqdefault.jpg",
      width: 480,
      height: 360,
    },
  },
  channelTitle: "SMTOWN",
  liveBroadcastContent: "none",
  publishTime: "2021-05-10T09:02:33Z",
} as Snippet;

const template = (storedVideoCount: number, datas: unknown[]) => {
  const videoCount = `
    <div class="d-flex justify-end text-gray-700">
    저장된 영상 갯수: ${storedVideoCount} 개
    </div>`;

  const list = `
        <section class="video-wrapper">
            ${videoArticle(sampleSnippet, "PkKnp4SdE-w", false)};
        </section>
    `;

  // // ${datas.map((data) => videoArticle(data)).join("")}

  return `${videoCount}${list}`;
};

export default template;
