import $ from 'js/dom/dom';
import youtubeArticle from 'js/components/youtubeArticle';

const playListAppend = list => {
  list.forEach(item => $.mainVideoWrapper.appendChild(youtubeArticle(item)));
};

export default playListAppend;
