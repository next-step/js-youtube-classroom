import App from '../app/App';

const renderRoot = ($root: Element) => {
  const $newRoot = $root.cloneNode(false) as Element;
  // 상태를 전역으로 참조하고 있기때문에 App을 호출하면 모듈화 되어있는 컴포넌트들이 변경된 상태를 가지고 본인의 모양을 가지게 된다. (지금은 실제 렌더링이 아니기 떄문에 이렇게 표현함)
  $newRoot.appendChild(App({}));

  return $newRoot;
};

export default renderRoot;
