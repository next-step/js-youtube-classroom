export const $ = (ele, dom = document) => dom.querySelector(ele);
export const $$ = (ele, dom = document) => dom.querySelectorAll(ele);

export const getPublishedTime = (publishTime) => {
  const cutPos = publishTime.match(/T/).index;
  const timeAry = publishTime.substring(0, cutPos).split("-");
  return `${timeAry[0]}년 ${parseInt(timeAry[1])}월 ${parseInt(timeAry[2])}일`;
};

export const saveDataToLocalStorage = (key, value) => {
  const jsonValue = JSON.stringify(value);
  localStorage.setItem(key, jsonValue);
};

export const loadDataFromLocalStorage = (key) => {
  const searchHistory = JSON.parse(localStorage.getItem(key));
  if (searchHistory === null) return [];
  else return searchHistory;
};

export const checkDuplicateID = (id, dataAry) => {
  for (let i = 0; i < dataAry.length; i++) {
    if (dataAry[i].videoId === id) return i;
  }
  return -1;
};

export function emit(target, eventName, detail) {
  const event = new CustomEvent(eventName, { detail });
  target.dispatchEvent(event);
}
