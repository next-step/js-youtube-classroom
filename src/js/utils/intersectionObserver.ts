const intersectionObserver = (
  $root: Element,
  $target: Element,
  cb: () => void
): void => {
  const options = {
    root: $root,
    rootMargin: "0px",
    threshold: 1.0,
  };

  const _onObserve = (entries: IntersectionObserverEntry[]): void => {
    if (entries[0].isIntersecting) {
      cb();
    }
  };

  const observer = new IntersectionObserver(_onObserve, options);
  observer.observe($target);
};

export default intersectionObserver;
