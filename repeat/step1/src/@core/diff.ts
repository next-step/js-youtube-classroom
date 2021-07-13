export const replaceAttributes = (
  realNode: HTMLElement,
  virtualNode: HTMLElement
) => {

  for (const { name, value } of [ ...realNode.attributes ]) {
    const virtualAttr = virtualNode.getAttribute(name);
    if (value === virtualAttr) continue;
    if (!virtualAttr) {
      realNode.removeAttribute(name);
      continue;
    }
    realNode.setAttribute(name, virtualAttr);
  }

  for (const { name, value } of [ ...virtualNode.attributes ]) {
    if (realNode.getAttribute(name)) {
      realNode.setAttribute(name, value);
    }
  }

}

export const replaceWith = (parent: Element, realNode?: ChildNode, virtualNode?: ChildNode) => {

  if (realNode && !virtualNode) {
    return realNode.remove();
  }

  if (!realNode && virtualNode) {
    return parent.appendChild(virtualNode);
  }

  if (realNode instanceof Text && virtualNode instanceof Text && realNode.nodeValue !== virtualNode.nodeValue) {
    realNode.nodeValue = virtualNode.nodeValue;
    return;
  }

  if (!(realNode instanceof Text || virtualNode instanceof Text)) {
    replaceAttributes(
      realNode as HTMLElement,
      virtualNode as HTMLElement
    );
  }

  const realChildren: ChildNode[] = [ ...realNode!.childNodes ];
  const virtualChildren: ChildNode[] = [ ...virtualNode!.childNodes ];
  const max = Math.max(realChildren.length, virtualChildren.length);

  for (let i = 0; i < max; i++) {
    replaceWith(
      realNode as Element,
      realChildren[i],
      virtualChildren[i]
    );
  }

}

export const diff = (realNode: Element, virtualNode: Element) => {

  const realChildren: ChildNode[] = [ ...realNode.childNodes ];
  const virtualChildren: ChildNode[] = [ ...virtualNode.childNodes ];
  const max = Math.max(realChildren.length, virtualChildren.length);

  for (let i = 0; i < max; i++) {
    replaceWith(
      realNode,
      realChildren[i],
      virtualChildren[i]
    );
  }

}
