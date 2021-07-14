import { createNode } from '../domHelper';
import store from '../store';
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
  children,
}) => {
  const $button = createNode('<button></button>', children) as HTMLButtonElement;

  if (onClick) $button.addEventListener('click', onClick);

  if (className) $button.className = className;
  if (id) $button.id = id;
  if (textContent) $button.textContent = textContent;
  $button.type = type;

  return $button;
};

export default Button;
