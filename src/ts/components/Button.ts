import { createNode } from '../domHelper';
import { CommonProps, Component } from '../types';

interface Props extends CommonProps {
  onClick?: EventListener;
  type?: string;
}

const Button: Component<Props> = ({
  onClick,
  textContent = '',
  type = 'button',
  className = '',
  id = '',
}) => {
  const $button = createNode('<button></button>') as HTMLButtonElement;

  if (onClick) $button.addEventListener('click', onClick);

  $button.className = className;
  $button.id = id;
  $button.textContent = textContent;
  $button.type = type;

  return $button;
};

export default Button;
