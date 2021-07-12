import { createNode } from '../domHelper';
import { CommonProps, Component } from '../types';

interface Props extends CommonProps {
  value: string;
  onInput: EventListener;
  placeholder?: string;
}

const Input: Component<Props> = ({ className, value, onInput, children }) => {
  const $input = createNode('<input/>', children) as HTMLInputElement;
  $input.className = className;
  $input.value = value;
  $input.addEventListener('input', onInput);

  return $input;
};

export default Input;
