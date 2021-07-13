export const selectOne = <T = HTMLElement>(
  selector: string,
  parent: HTMLElement | Document = document
): T => parent.querySelector(selector) as unknown as T;

export const selectAll = <T = HTMLElement>(
  selector: string,
  parent: HTMLElement | Document = document
): T[] => [ ...parent.querySelectorAll(selector) ] as unknown as T[];

