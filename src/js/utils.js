export const $ = (ele, dom = document) => dom.querySelector(ele)
export const $$ = (ele, dom = document) => dom.querySelectorAll(ele)

export const getPublishedTime = (publishTime) => {
    const cutPos = publishTime.match(/T/).index;
    const timeAry = publishTime.substring(0, cutPos).split("-");
    return `${timeAry[0]}년 ${parseInt(timeAry[1])}월 ${parseInt(timeAry[2])}일`;
  };