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

  const { dispatch } = store;

  const onModalOpenHanlder = () => {
    dispatch(modalOpenAction());
  };

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
          Navigator({
            children: [
              Button({ className: 'btn bg-cyan-100 mx-1', textContent: '👁️ 볼 영상' }),
              Button({ className: 'btn mx-1', textContent: '✅ 본 영상' }),
              Button({ className: 'btn mx-1', textContent: '👍 좋아하는 영상' }),
              Button({
                id: 'search-button',
                className: 'btn mx-1',
                textContent: '🔍 동영상 검색',
                onClick: onModalOpenHanlder,
              }),
            ],
          }),
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
