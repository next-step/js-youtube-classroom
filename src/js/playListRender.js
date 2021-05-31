import $ from 'js/dom/dom';

const playListData = {
  list: JSON.parse(localStorage.getItem('playList'))?.list ?? [],
};

$.playListLength.textContent = playListData.list.length;
