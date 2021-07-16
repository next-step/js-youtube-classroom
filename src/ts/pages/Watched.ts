import { createNode } from '../domHelper';
import { CommonProps, Component } from '../types';

interface Props extends CommonProps {}

const Watched: Component<Props> = () => {
  const $watchedPage = createNode('<div>라우트테스트 watchPage</div>');

  return $watchedPage;
};

export default Watched;
