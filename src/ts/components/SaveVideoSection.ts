import { createNode } from '../domHelper';
import store from '../store';
import { Component } from '../types';

interface Props {
  children: Element[];
}

const SaveVideoSection: Component<Props> = ({ children }) => {
  const $saveVideoSection = createNode('<section class="video-wrapper"></section>', children);

  return $saveVideoSection;
};

export default SaveVideoSection;
