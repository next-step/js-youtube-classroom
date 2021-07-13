export const selectOne = <T extends HTMLElement = HTMLElement>(
  selector: string,
  parent: HTMLElement | Document = document
): T => parent.querySelector(selector) as unknown as T;

export const selectAll = <T extends HTMLElement = HTMLElement>(
  selector: string,
  parent: HTMLElement | Document = document
): T[] => [ ...parent.querySelectorAll(selector) ] as unknown as T[];

export const cloneNode = <T extends HTMLElement = HTMLElement>(
  element: T
) => element.cloneNode(true) as T;

export const simpleDeepEquals = (obj1: any, obj2: any) => {
  return (
    obj1 === obj2 ||
    JSON.stringify(obj1) === JSON.stringify(obj2)
  );
}

export const debounceFrame = (() => {
  let debounced = -1;
  return (fn: () => void) => {
    cancelAnimationFrame(debounced);
    debounced = requestAnimationFrame(fn);
  }
})();