import thumbnail from 'js/components/thumbnail';
import content from 'js/components/content';
import saveButton from 'js/components/saveButton';

const searchArticle = (item, playListState, render) => {
  const {
    id: { videoId },
    snippet,
  } = item;

  const $searchArticle = document.createElement('article');
  $searchArticle.className = 'clip';

  $searchArticle.innerHTML = `
    ${thumbnail(videoId)}
  `;

  $searchArticle.appendChild(content(videoId, snippet, saveButton(item, playListState, render)));

  return $searchArticle;
};

export default searchArticle;
