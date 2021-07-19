import { createNode } from '../domHelper';
import route from '../route';
import { HOME_PAGE, LIKE_PAGE, TO_WATCH_PAGE, WATCHED_PAGE } from '../route/path';
import store from '../store';
import { modalOpenAction } from '../store/actionCreator';
import { CommonProps, Component } from '../types';
import Button from './Button';
import Link from './Link';

interface Props extends CommonProps {}

const Navigator: Component<Props> = () => {
  const { dispatch, getState } = store;

  const { currentPath } = getState();

  console.log(currentPath);

  const onModalOpenHanlder = () => {
    dispatch(modalOpenAction());
  };

  const { navigate } = route;

  const $navigator = createNode('<nav class="d-flex justify-center"></nav>', [
    Link({
      to: TO_WATCH_PAGE,
      className: `btn mx-1${
        currentPath === TO_WATCH_PAGE || currentPath === HOME_PAGE ? ' bg-cyan-100' : ''
      }`,
      textContent: '👁️ 볼 영상',
    }),
    Link({
      to: WATCHED_PAGE,
      className: `btn mx-1${currentPath === WATCHED_PAGE ? ' bg-cyan-100' : ''}`,
      textContent: '✅ 본 영상',
    }),
    Link({
      to: LIKE_PAGE,
      className: `btn mx-1${currentPath === LIKE_PAGE ? ' bg-cyan-100' : ''}`,
      textContent: '👍 좋아하는 영상',
    }),
    Button({
      id: 'search-button',
      className: 'btn mx-1',
      textContent: '🔍 동영상 검색',
      onClick: onModalOpenHanlder,
    }),
  ]);

  const onNavigatehandler = (event: Event) => {
    event.preventDefault();

    const target = event.target as Element;
    if (!target.matches('button[data-route]')) return;
    const path = (target.parentNode as HTMLAnchorElement).pathname;

    navigate(path);
  };

  $navigator.addEventListener('click', onNavigatehandler);

  return $navigator;
};

export default Navigator;
