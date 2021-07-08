import { Component } from '../types';

const createNode = (DOMstring: string, children?: Component[]) => {
  const template = document.createElement('template');
  template.innerHTML = DOMstring;

  const node = template.content.firstElementChild.cloneNode(true);

  if (children) {
    children.forEach(child => {
      node.appendChild(child());
    });
  }

  return node;
};

export default createNode;
