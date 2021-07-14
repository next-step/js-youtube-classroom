import { createNode } from '../domHelper';
import { CommonProps, Component } from '../types';
import notFoundImage from '../../images/status/not_found.png';

interface Props extends CommonProps {}

const NotFound: Component<Props> = () => {
  const $notFount = createNode(`
    <div>
      <img src="${notFoundImage}" alt="" />
      <div>검색 결과가 없습니다 :(</div>
    </div>
  `);

  return $notFount;
};

export default NotFound;
