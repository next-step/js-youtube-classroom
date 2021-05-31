import $ from 'js/dom/dom';
import searchArticle from 'js/components/searchArticle';

const searchListAppend = list => {
  list.map(({ id: { videoId }, snippet }) =>
    $.modalVideoWrapper.appendChild(searchArticle(videoId, snippet))
  );
};

export default searchListAppend;
