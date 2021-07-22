import { createNode } from '../domHelper';
import { CommonProps, Component } from '../types';

interface Props extends CommonProps {}

const Header: Component<Props> = ({ className, children }) => {
  const $header = createNode('<header class="my-4"></header>', children);
  $header.className = className;

  return $header;
};

export default Header;
