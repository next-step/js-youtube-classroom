import { createNode } from '../domHelper';
import { CommonProps, Component } from '../types';

interface Props extends CommonProps {
  to: string;
}

const Link: Component<Props> = ({ to, textContent, className }) => {
  const $link = createNode(`
  <a href="${to}">
    <Button data-route class="${className}">${textContent}</Button>
  </a>`);

  return $link;
};

export default Link;
