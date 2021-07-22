import '../css/index.css';
import store from './store';
import { applyDiff, renderRoot } from './domHelper';

// render가 다시 호출되는 시점은 dispatch가 되어 이미 상태가 변경된 이후이다.
const render = () => {
  window.requestAnimationFrame(() => {
    const $root = document.querySelector('#root');

    // 변경된 상태가 적용된 가상돔 객체이다.
    const $newRoot = renderRoot($root);
    // 그 후 실제 돔과 복사본을 비교해준 뒤 바뀐 부분만 apply해준다.
    applyDiff(document.body, $root, $newRoot);
  });
};

store.subscribe(render);

render();
