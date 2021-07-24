import { createNode } from '../domHelper';
import { CommonProps, Component } from '../types';

interface Props extends CommonProps {}

const Skeleton: Component<Props> = () => {
  const $skeleton = createNode(`
    <div class="skeleton">
      <div class="image"></div>
      <p class="line"></p>
      <p class="line"></p>
    </div>
  `);

  return $skeleton;
};
export default Skeleton;
