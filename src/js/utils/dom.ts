export const $ = (
  selector: string,
  target: Document | Element = document
): Element | null => target.querySelector(selector);
export const $$ = (
  selector: string,
  target: Document | Element = document
): NodeListOf<Element> | null => target.querySelectorAll(selector);

export const removeClasses = (
  List: NodeListOf<Element>,
  className: string
): void => {
  Array.from(List).forEach((node) => node.classList.remove(className));
  return;
};

export const addClass = (target: Element, className: string): void => {
  target.classList.add(className);
};
