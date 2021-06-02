import thumbnail from 'js/components/thumbnail';
import content from 'js/components/content';
import optionBUttons from 'js/components/optionButtons';

const youtubeArticle = (item, playListData, render) => {
  const {
    id: { videoId },
    snippet,
  } = item;

  const $youtubeArticle = document.createElement('article');
  $youtubeArticle.className = 'clip';

  $youtubeArticle.innerHTML = `
    ${thumbnail(videoId)}
  `;

  $youtubeArticle.appendChild(content(videoId, snippet, optionBUttons(item, playListData, render)));

  return $youtubeArticle;
};

export default youtubeArticle;
