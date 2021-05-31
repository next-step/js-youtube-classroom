const createObservedTarget = node => {
  const $observedTarget = document.createElement('div');
  $observedTarget.classList.add('observed-target');
  node.appendChild($observedTarget);

  return $observedTarget;
};

export default createObservedTarget;
