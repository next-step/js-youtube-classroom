import notFoundImage from 'images/status/not_found.png';

const convertTimeIntoSimpleFormat = time => {
  const dateArr = time.slice(0, time.indexOf('T')).split('-');
  const convertedTimeArr = dateArr.map(convertedTime => {
    if (convertedTime[0] === '0') return convertedTime[1];
    return convertedTime;
  });
  return `${convertedTimeArr[0]}년 ${convertedTimeArr[1]}월 ${convertedTimeArr[2]}일`;
};

export const getYoutubeItemsTemplate = items =>
  items
    .map(item => {
      const {
        snippet: { title, channelId, channelTitle, publishedAt },
        id: { videoId },
      } = item;
      return `<article class="clip">
<div class="preview-container">
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
  <div class="d-flex justify-end">
    <button class="btn">⬇️ 저장</button>
  </div>
</div>
</div>
</article>`;
    })
    .join('');

export const getSkeletonTemplate = numOfSkeletons =>
  Array.from({ length: numOfSkeletons }, (_, i) => i)
    .map(
      () => `<div class="skeleton">
<div class="image"></div>
<p class="line"></p>
<p class="line"></p>
<p class="line"></p>
<p class="button"></p>
</div>`
    )
    .join('');

export const getNotFoundTemplate = () => `<div class="not-found">
<img src=${notFoundImage} alt="검색 결과 없음"/>
<p>검색 결과 없음</p>
</div>`;
