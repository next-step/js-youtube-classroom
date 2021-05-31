import thumbnail from 'js/components/thumbnail';
import content from 'js/components/content';
import saveButton from 'js/components/saveButton';

const searchArticle = (videoId, contents) => {
  const $searchArticle = document.createElement('article');
  $searchArticle.className = 'clip';

  $searchArticle.innerHTML = `
    ${thumbnail(videoId)}
  `;

  $searchArticle.appendChild(content(contents, saveButton(videoId)));

  return $searchArticle;
};

export default searchArticle;
