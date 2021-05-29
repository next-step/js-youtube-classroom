export const $ = (
  selector: string,
  target: Document | Element = document
): Element | null => target.querySelector(selector);
export const $$ = (
  selector: string,
  target: Document | Element = document
): NodeListOf<Element> | null => target.querySelectorAll(selector);
