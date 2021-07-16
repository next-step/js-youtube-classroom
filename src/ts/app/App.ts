import { Button, Header, Heading, Modal, Navigator } from '../components';
import { createNode } from '../domHelper';
import { ToWatch } from '../pages';
import store from '../store';
import { modalOpenAction } from '../store/actionCreator';
import { Component } from '../types';

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
      ToWatch({}),
      isModalOpen ? Modal({}) : null,
    ]),
  ]);

  $app.appendChild($homeWrapper);

  return $app;
};

export default App;
