const intersectionObserver = (
  $root: Element,
  $target: Element,
  cb: () => void
) => {
  const options = {
    root: $root,
    rootMargin: "0px",
    threshold: 1.0,
  };

  const _onObserve = (entries: any, observer: any) => {
    const ioTarget = entries[0].target;
    if (entries[0].isIntersecting) {
      console.log("?");
      cb();
    }
  };

  const observer = new IntersectionObserver(_onObserve, options);
  observer.observe($target);
};

export default intersectionObserver;
