import $ from 'js/dom/dom';
import searchArticle from 'js/components/searchArticle';

const searchListAppend = list => {
  list.map((item, index) => $.modalVideoWrapper.appendChild(searchArticle(item, index)));
};

export default searchListAppend;
