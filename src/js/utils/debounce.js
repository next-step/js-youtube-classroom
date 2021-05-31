const debounce = (callback, delay) => {
  let timerId = null;
  return event => {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(callback, delay, event);
  };
};

export default debounce;
