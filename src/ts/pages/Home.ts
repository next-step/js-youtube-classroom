import { Button, Header, Heading, Main, Modal, Navigator } from '../components';
import { createNode } from '../domHelper';
import store from '../store';
import { modalOpenAction } from '../store/actionCreator';
import { Component } from '../types';

interface Props {}

const Home: Component<Props> = () => {
  const { dispatch, getState } = store;
  const { isModalOpen } = getState();
  const $homeWrapper = createNode('<div class="d-flex justify-center mt-5 w-100"></div>');

  const onModalOpenHanlder = () => {
    dispatch(modalOpenAction());
  };

  const $home = createNode('<div class="w-100"></div>', [
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
    Main({}),
  ]);

  $homeWrapper.appendChild($home);

  return $homeWrapper;
};

export default Home;
