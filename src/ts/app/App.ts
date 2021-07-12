import { Modal } from '../components';
import { createNode } from '../domHelper';
import { Home } from '../pages';
import store from '../store';
import { Component } from '../types';

interface Props {}

const App: Component<Props> = () => {
  const { isModalOpen } = store.getState();

  const $app = createNode(`<div id="app"></div>`, [Home({}), isModalOpen ? Modal({}) : null]);

  return $app;
};

export default App;
