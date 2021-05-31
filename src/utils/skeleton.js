const showSkeleton = (node, numOfSkeletons) => {
  node.innerHTML = Array.from({ length: numOfSkeletons }, (_, i) => i)
    .map(
      () => `<div class="skeleton">
  <div class="image"></div>
  <p class="line"></p>
  <p class="line"></p>
  <p class="line"></p>
  <p class="button"></p>
  </div>`
    )
    .join('');
};

export default showSkeleton;
