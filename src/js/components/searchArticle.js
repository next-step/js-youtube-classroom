import thumbnail from 'js/components/thumbnail';
import content from 'js/components/content';
import saveButton from 'js/components/saveButton';

const searchArticle = (src, contents) => `
  <article class="clip">
    ${thumbnail(src)}
    ${content(contents, saveButton)}
  </article>
`;

export default searchArticle;
