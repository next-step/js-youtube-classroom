export const $ = (
  selector: string,
  target: Document | HTMLElement = document
): HTMLElement => target.querySelector(selector) as HTMLElement;

export const $$ = (
  selector: string,
  target: Document | HTMLElement = document
): NodeListOf<HTMLElement> => target.querySelectorAll(selector);

export const closest = (target: HTMLElement, selector: string): HTMLElement =>
  target.closest(selector) as HTMLElement;
