export const $ = (
  selector: string,
  target: Document | HTMLElement = document
): HTMLElement => target.querySelector(selector) as HTMLElement;

export const $$ = (
  selector: string,
  target: Document | HTMLElement = document
): NodeListOf<HTMLElement> => target.querySelectorAll(selector);

export const removeClasses = (
  List: NodeListOf<HTMLElement>,
  className: string
): void => {
  Array.from(List).forEach((node) => node.classList.remove(className));
  return;
};

export const addClass = (target: HTMLElement, className: string): void => {
  target.classList.add(className);
};
