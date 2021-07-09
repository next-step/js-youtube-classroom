import { Modal } from '../components';
import { createNode } from '../domHelper';
import { Home } from '../pages';
import { Component } from '../types';

interface Props {}

const App: Component<Props> = () => {
  const $app = createNode(`<div id="app"></div>`, [Home({}), Modal({})]);

  return $app;
};

export default App;
