const createNode = (DOMstring: string, children: Node[]) => {
  const template = document.createElement('template');
  template.innerHTML = DOMstring;

  const node = template.content.firstElementChild.cloneNode(true);
  children.forEach(child => node.appendChild(child));

  return node;
};

export default createNode;
