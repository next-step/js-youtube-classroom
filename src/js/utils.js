export const selectDOM = (selector, dom = document) => dom.querySelector(selector)
export const selectDOMS = (selector, dom = document) => dom.querySelectorAll(selector)

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
  return JSON.parse(localStorage.getItem(key)) || [];
};

export const checkDuplicateID = (id, dataArray) => {
  return dataArray.findIndex(videoData => videoData.videoId === id);
};

export const addEvents = (target, eventName, handler) => {
    target.addEventListener(eventName, handler)
}

export function emit(target, eventName, detail) {
    const event = new CustomEvent(eventName, { detail });
    target.dispatchEvent(event);
  }