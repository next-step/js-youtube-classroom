import { createNode } from '../domHelper';
import { CommonProps, Component } from '../types';

interface Props extends CommonProps {}

const Like: Component<Props> = () => {
  const $likePage = createNode('<div>라우트 테스트 Like 페이지</div>');

  return $likePage;
};

export default Like;
