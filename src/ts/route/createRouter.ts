import { createNode } from '../domHelper';
import { NotFound } from '../pages';
import store from '../store';
import { pageChangeAction } from '../store/actionCreator';
import { CommonProps, Component } from '../types';
import { Router } from '../types/Route';
import { NOT_FOUND } from './path';

const createRouter = () => {
  let lastPath = '';
  const { dispatch } = store;
  let currentComponent: Component<CommonProps>;

  const Router: Router = routes => {
    const { currentPath } = store.getState();

    const currentPage = routes.find(route => route.path === currentPath);
    if (!currentPage) {
      currentComponent = NotFound;
      window.history.pushState(null, '', NOT_FOUND);
    } else currentComponent = currentPage.component;

    const $router = createNode(`<div id="router-root"></div>`, [currentComponent({})]);

    return $router;
  };

  const navigate = (path: string) => {
    if (lastPath === path) return;

    window.history.pushState(null, '', path);
    lastPath = path;

    // path가 바뀔때마다 route메서드를 호출한다.
    dispatch(pageChangeAction(path));
  };

  window.addEventListener('popstate', () => {
    dispatch(pageChangeAction(window.location.pathname));
  });

  return {
    Router,
    navigate,
  };
};

export default createRouter;
