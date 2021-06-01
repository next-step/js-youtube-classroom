import thumbnail from 'js/components/thumbnail';
import content from 'js/components/content';
import saveButton from 'js/components/saveButton';

const searchArticle = item => {
  const {
    id: { videoId },
    snippet,
  } = item;

  const $searchArticle = document.createElement('article');
  $searchArticle.className = 'clip';

  $searchArticle.innerHTML = `
    ${thumbnail(videoId)}
  `;

  $searchArticle.appendChild(content(snippet, saveButton(item)));

  return $searchArticle;
};

export default searchArticle;
