import { Header, Main, Modal } from '../components';
import { createNode } from '../domHelper';
import { Component } from '../types';

interface Props {}

const Home: Component<Props> = () => {
  const $homeWrapper = createNode('<div class="d-flex justify-center mt-5 w-100"></div>');

  const $home = createNode('<div class="w-100"></div>', [
    Header({ className: '', children: [] }),
    Main({}),
  ]);

  $homeWrapper.appendChild($home);

  return $homeWrapper;
};

export default Home;
