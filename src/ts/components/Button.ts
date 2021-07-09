import { createNode } from '../domHelper';
import { Component } from '../types';

interface Props {
  onClick?: EventListener;
  textContent: string;
  className?: string;
  type?: string;
  id?: string;
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
