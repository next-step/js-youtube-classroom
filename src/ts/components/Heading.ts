import { createNode } from '../domHelper';
import { Component } from '../types';

interface Props {
  level: number | string;
  className: string;
  children?: Element[];
  textContent: string;
}

const Heading: Component<Props> = ({
  children = [],
  className = '',
  level = 1,
  textContent = '',
}) => {
  const $heading = createNode(`<h${level}>${textContent}</h${level}>`, children);
  $heading.className = className;

  return $heading;
};

export default Heading;
