const createNode = (DOMstring: string, children?: Array<Element | null | false | undefined>) => {
  const template = document.createElement('template');
  template.innerHTML = DOMstring;

  const node = template.content.firstElementChild.cloneNode(true) as Element;

  if (children) {
    children.forEach(child => {
      if (!child) return;
      node.appendChild(child);
    });
  }

  return node;
};

export default createNode;
