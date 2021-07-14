import { createNode } from '../domHelper';
import { CommonProps, Component } from '../types';

interface Props extends CommonProps {
  placeholder?: string;
}

const Input: Component<Props> = ({ className, children }) => {
  const $input = createNode('<input/>', children) as HTMLInputElement;
  $input.className = className;

  return $input;
};

export default Input;
