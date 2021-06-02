import notFoundImage from 'images/status/not_found.png';

const convertTimeIntoSimpleFormat = time => {
  const dateArr = time.slice(0, time.indexOf('T')).split('-');
  const convertedTimeArr = dateArr.map(convertedTime => {
    if (convertedTime[0] === '0') return convertedTime[1];
    return convertedTime;
  });
  return `${convertedTimeArr[0]}년 ${convertedTimeArr[1]}월 ${convertedTimeArr[2]}일`;
};

export const getYoutubeItemsTemplate = (item, isSaved, youtubeItemType) => {
  const {
    snippet: { title, channelId, channelTitle, publishedAt },
    id: { videoId },
    state,
  } = item;

  return `<div class="preview-container">
<iframe
  width="100%"
  height="118"
  src=https://www.youtube.com/embed/${videoId}
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
    <p>${convertTimeIntoSimpleFormat(publishedAt)}</p>
  </div>
  ${
    youtubeItemType === 'lecture'
      ? `<div>
  <span class="opacity-hover watched ${
    state?.isWatched ? 'checked' : ''
  }">✅</span>
  <span class="opacity-hover liked">👍</span>
  <span class="opacity-hover">💬</span>
  <span class="opacity-hover delete">🗑️</span>
</div>`
      : `<div class="d-flex justify-end">
<button class="btn" ${isSaved ? 'disabled' : ''}>⬇️ 저장</button>
</div>`
  }
  
</div>
</div>`;
};

export const getSkeletonTemplate = () =>
  `
<div class="image"></div>
<p class="line"></p>
<p class="line"></p>
<p class="line"></p>
<p class="button"></p>
`;

export const getNotFoundTemplate = () => `<div class="not-found">
<img src=${notFoundImage} alt="검색 결과 없음"/>
<p>검색 결과 없음</p>
</div>`;

export const getChipTemplate = chips =>
  chips
    .map((chip, index) =>
      chip ? `<a class="chip">${chips[chips.length - index - 1]}</a>` : ''
    )
    .join('');

export const getNoResultTemplate = () => `
<div class="no-results">영상이 없습니다 😭</div>
`;
