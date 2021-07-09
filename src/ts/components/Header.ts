import { createNode } from '../domHelper';
import { Component } from '../types';
import { Heading, Navigator, Button } from './';

interface Props {
  className: string;
  children: Element[];
}

const Header: Component<Props> = ({ className }) => {
  const $header = createNode('<header class="my-4"></header>', [
    Heading({
      level: 2,
      className: 'text-center font-bold',
      textContent: '👩🏻‍💻 나만의 유튜브 강의실 👨🏻‍💻',
    }),
    Navigator({
      children: [
        Button({ className: 'btn bg-cyan-100 mx-1', textContent: '👁️ 볼 영상' }),
        Button({ className: 'btn mx-1', textContent: '✅ 본 영상' }),
        Button({ id: 'search-button', className: 'btn mx-1', textContent: '🔍 동영상 검색' }),
      ],
    }),
  ]);
  $header.className = className;

  return $header;
};

export default Header;
