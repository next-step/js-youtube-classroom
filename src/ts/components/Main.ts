import { createNode } from '../domHelper';
import store from '../store';
import { Component } from '../types';
import SaveVideoSection from './SaveVideoSection';
import Video from './Video';

interface Props {}

const Main: Component<Props> = ({}) => {
  const state = store.getState();

  console.log(state);

  const $main = createNode('<main class="mt-10"></main>', [
    SaveVideoSection({ children: state.saveVideoList.map(video => Video({ ...video })) }),
  ]);

  return $main;
};

export default Main;
