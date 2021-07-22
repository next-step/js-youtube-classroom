import store from '../store';
import { createNode } from '../domHelper';
import { Component } from '../types';
import route from '../route';
import { Header, Heading, Modal, Navigator, Snackbar } from '../components';
import { HOME_PAGE, LIKE_PAGE, TO_WATCH_PAGE, WATCHED_PAGE } from '../route/path';
import { Like, ToWatch, Watched } from '../pages';

interface Props {}

const App: Component<Props> = () => {
  const { isModalOpen } = store.getState();

  const $app = createNode(`<div id="app"></div>`, []);

  const $homeWrapper = createNode('<div class="d-flex justify-center mt-5 w-100"></div>', [
    createNode('<div class="w-100"></div>', [
      Header({
        className: '',
        children: [
          Heading({
            level: 2,
            className: 'text-center font-bold',
            textContent: '👩🏻‍💻 나만의 유튜브 강의실 👨🏻‍💻',
          }),
          Navigator({}),
        ],
      }),
      // pathname에 따라 페이지를 렌더링 해줄것이다.
      route.Router([
        { path: HOME_PAGE, component: ToWatch },
        { path: TO_WATCH_PAGE, component: ToWatch },
        { path: WATCHED_PAGE, component: Watched },
        { path: LIKE_PAGE, component: Like },
      ]),
      Snackbar({}),
      isModalOpen ? Modal({}) : null,
    ]),
  ]);

  $app.appendChild($homeWrapper);

  return $app;
};

export default App;
