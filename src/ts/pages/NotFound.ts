import { createNode } from '../domHelper';
import { CommonProps, Component } from '../types';

interface Props extends CommonProps {}

const NotFound: Component<Props> = () => {
  const $notFound = createNode('<div>요청하신 페이지를 찾을 수 없습니다 :(</div>');

  return $notFound;
};

export default NotFound;
