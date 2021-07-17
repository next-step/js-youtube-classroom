export const selectDOM = (selector, dom = document) =>
  dom.querySelector(selector);
export const selectDOMS = (selector, dom = document) =>
  dom.querySelectorAll(selector);

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
  return dataArray.findIndex((videoData) => videoData.videoId === id);
};

export const getVideoDataFromId = (id, dataArray) => {
  return dataArray[checkDuplicateID(id, dataArray)]
};

export const addEvents = (target, eventName, handler) => {
  target.addEventListener(eventName, handler);
};

export const emit = (target, eventName, detail) => {
  const event = new CustomEvent(eventName, { detail });
  target.dispatchEvent(event);
};

export const addClass = (target, className) => target.classList.add(className);

export const removeClass = (target, className) =>
  target.classList.remove(className);

export const makeDataset = (channelId, channelTitle, videoId, videoTitle, publishTime) => {
  const data = {
    channelId,
    channelTitle,
    videoId,
    videoTitle,
    publishTime,
    watch: 0,
    liked: 0
  }
  return data
}

export const setVideoState = (watch, like) => {
  return {watch, like}
}

