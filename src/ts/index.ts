import '../css/index.css';
import App from './app/App';
import store from './store';

const $root = document.querySelector('#root');

const render = () => {
  window.requestAnimationFrame(() => {
    $root.innerHTML = '';
    $root.appendChild(App({}));
  });
};

store.subscribe(render);

render();
