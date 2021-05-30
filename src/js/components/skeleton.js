const $skeletons = () =>
  Array.from({ length: 10 }, () => 0)
    .map(
      () => `
<div class="skeleton">
  <div class="image"></div>
    <p class="line"></p>
    <p class="line"></p>
    <p class="line"></p>
  <div class="save"></div>
</div>`
    )
    .join('');

export default $skeletons;
