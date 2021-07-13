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
  if (obj1 instanceof Set && obj2 instanceof Set) {
    return JSON.stringify([ ...obj1 ]) === JSON.stringify([ ...obj2 ]);
  }

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

export const dateformat = (date: Date | string) => {
  const temp = new Date(date);
  return `${temp.getFullYear()}년 ${temp.getMonth() + 1}월 ${temp.getDate()}일`;
}