import { createNode } from '../domHelper';
import { Component } from '../types';

interface Props {
  children: Element[];
}

const Navigator: Component<Props> = ({ children }) => {
  const $navigator = createNode('<nav class="d-flex justify-center"></nav>', children);

  return $navigator;
};

export default Navigator;

// <button class="btn bg-cyan-100 mx-1">👁️ 볼 영상</button>
//       <button class="btn mx-1">✅ 본 영상</button>
//       <button id="search-button" class="btn mx-1">🔍 동영상 검색</button>
