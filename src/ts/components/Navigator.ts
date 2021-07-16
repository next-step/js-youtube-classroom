import { createNode } from '../domHelper';
import store from '../store';
import { modalOpenAction } from '../store/actionCreator';
import { CommonProps, Component } from '../types';
import Button from './Button';

interface Props extends CommonProps {}

const Navigator: Component<Props> = () => {
  const { dispatch } = store;

  const onModalOpenHanlder = () => {
    dispatch(modalOpenAction());
  };

  const $navigator = createNode('<nav class="d-flex justify-center"></nav>', [
    Button({ className: 'btn bg-cyan-100 mx-1', textContent: '👁️ 볼 영상' }),
    Button({ className: 'btn mx-1', textContent: '✅ 본 영상' }),
    Button({ className: 'btn mx-1', textContent: '👍 좋아하는 영상' }),
    Button({
      id: 'search-button',
      className: 'btn mx-1',
      textContent: '🔍 동영상 검색',
      onClick: onModalOpenHanlder,
    }),
  ]);

  return $navigator;
};

export default Navigator;
