import { Header, Heading, Modal, Navigator } from '../components';
import { createNode } from '../domHelper';
import { routerRoot } from '../route';
import store from '../store';
import { Component } from '../types';

interface Props {}

const App: Component<Props> = () => {
  const { isModalOpen } = store.getState();

  const $app = createNode(`<div id="app"></div>`, []);

  // TODO: setNotFound(component);

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
      routerRoot,
      isModalOpen ? Modal({}) : null,
    ]),
  ]);

  $app.appendChild($homeWrapper);

  return $app;
};

export default App;
