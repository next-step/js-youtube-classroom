const debounce = (callback: Function, delay: number): Function => {
  let timerId = null;
  return (event?: EventListener) => {
    if (timerId) clearTimeout(timerId);
    timerId = window.setTimeout(() => {
      callback(event);
    }, delay);
  };
};

export default debounce;
