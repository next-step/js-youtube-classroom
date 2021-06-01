import $ from 'js/dom/dom';
import playListAppend from 'js/utils/playListAppend';

const playListData = {
  list: JSON.parse(localStorage.getItem('playList'))?.list ?? [],
};

$.playListLength.textContent = playListData.list.length;

if (playListData.list.length) {
  playListAppend(playListData.list);
} else {
  $.emptyMessageContainer.classList.add('empty');
}
