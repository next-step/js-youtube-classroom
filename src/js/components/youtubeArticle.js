import thumbnail from 'js/components/thumbnail';
import content from 'js/components/content';
import optionBUttons from 'js/components/optionBUttons';

const youtubeArticle = (src, contents) => {
  const $youtubeArticle = document.createElement('article');
  $youtubeArticle.className = 'clip';

  $youtubeArticle.innerHTML = `
    ${thumbnail(src)}
  `;

  $youtubeArticle.appendChild(content(contents, optionBUttons()));

  return $youtubeArticle;
};

export default youtubeArticle;
