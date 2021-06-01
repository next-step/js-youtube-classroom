import notFoundImageURL from 'images/status/not_found.png';

const getDateInKorean = dateString => {
  const [year, month, date] = dateString.split('-');
  return `${year}년 ${month}월 ${date.slice(0, 2)}일`;
};

export const getSearchedYoutubeCardTemplate = (
  { id, snippet },
  isSavedYoutube
) => {
  const { videoId } = id;
  const { title, channelTitle, channelId, publishedAt } = snippet;
  const date = getDateInKorean(publishedAt);

  return `<div class="preview-container">
    <iframe
      width="100%"
      height="118"
      src="https://www.youtube.com/embed/${videoId}"
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
        ${channelTitle}
      </a>
      <div class="meta">
        <p>${date}</p>
      </div>
      <div class="d-flex justify-end btn-container">
        ${isSavedYoutube ? '' : '<button class="btn">⬇️ 저장</button>'}
      </div>
    </div>
  </div>`;
};

export const getYoutubeCardSkeleton = () => `<div class="image"></div>
<p class="line"></p>
<p class="line"></p>
<p class="line"></p>
<p class="line"></p>
<div class="btn"></div>`;

export const getNoResultTemplate = text => `<div class="no-result">
<img class="image" src="${notFoundImageURL}" alt="">
<p class="text">${text}</p>
</div>`;

export const getChipTemplate = content => `<a class="chip">${content}</a>`;
