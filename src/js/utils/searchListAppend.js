import $ from 'js/dom/dom';
import searchArticle from 'js/components/searchArticle';

const searchListAppend = list => {
  list.forEach(item => $.modalVideoWrapper.appendChild(searchArticle(item)));
};

export default searchListAppend;
