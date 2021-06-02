// eslint-disable-next-line import/no-mutable-exports
import $ from 'js/dom/dom';
import 'js/modalToggle';
import youtubeSearch from 'js/youtubeSearch';
import youtubeArticle from 'js/components/youtubeArticle';

// global state
let playListState = {
  // will, watched, like 세가지 상태를 다룰 예정
  status: 'will',
  list: JSON.parse(localStorage.getItem('playList'))?.list ?? [],
};

const setPlayListState = newPlayListState => {
  playListState = newPlayListState;
};

$.playListLength.textContent = playListState.list.length;

// 플레이리스트를 업데이트 시켜 줄 render 함수
const render = newPlayList => {
  if (newPlayList) setPlayListState({ ...playListState, list: newPlayList });
  $.mainVideoWrapper.innerHTML = '';
  if (playListState.list.length) {
    const $fragment = document.createDocumentFragment();
    playListState.list.forEach(item => {
      if (playListState.status === 'will') {
        if (!item.isWatch) {
          $fragment.appendChild(youtubeArticle(item, playListState, render));
        }
      } else if (playListState.status === 'watched') {
        if (item.isWatch) {
          $fragment.appendChild(youtubeArticle(item, playListState, render));
        }
      }
    });
    $.mainVideoWrapper.appendChild($fragment);
  } else {
    $.emptyMessageContainer.classList.add('empty');
  }
};

render();

// 이벤트 핸들러 ------------------------------------------------------------------------------
const onChangeStatusToWatchedHandler = ({ target }) => {
  setPlayListState({ ...playListState, status: 'watched' });
  target.previousElementSibling.classList.remove('bg-cyan-100');
  target.classList.add('bg-cyan-100');

  render(playListState.list);
};

const onChangeStatusToWillHandler = ({ target }) => {
  setPlayListState({ ...playListState, status: 'will' });
  target.nextElementSibling.classList.remove('bg-cyan-100');
  target.classList.add('bg-cyan-100');

  render(playListState.list);
};

// 이벤트 핸들러 등록 ------------------------------------------------------------------------------
$.willStatus.addEventListener('click', onChangeStatusToWillHandler);
$.watchedStatus.addEventListener('click', onChangeStatusToWatchedHandler);

youtubeSearch(playListState, setPlayListState, render);
