import { createNode } from '../domHelper';
import { CommonProps, Component } from '../types';

interface Props extends CommonProps {}

const Observe: Component<Props> = () => {
  const $observe = createNode('<div></div>');

  return $observe;
};

export default Observe;
