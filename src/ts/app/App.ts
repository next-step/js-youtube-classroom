import { createNode } from '../domHelper';
import { Home } from '../pages';
import { Component } from '../types';

const App: Component = () => {
  const $app = createNode(`<div></div>`, [Home]);

  return $app;
};

export default App;
