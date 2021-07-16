import { createNode } from '../domHelper';
import { CommonProps, Component } from '../types';

interface Props extends CommonProps {}

const Like: Component<Props> = () => {
  const $likePage = createNode('');

  return $likePage;
};

export default Like;
