import $ from 'js/dom/dom';
import searchArticle from 'js/components/searchArticle';

const searchListAppend = (list, playListState, render) => {
  list.forEach(item => $.modalVideoWrapper.appendChild(searchArticle(item, playListState, render)));
};

export default searchListAppend;
