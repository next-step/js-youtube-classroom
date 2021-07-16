import { CommonProps, Component } from '../types';

const createRouter = (routerRoot: Element) => {
  const routes: { path: string; component: Component<CommonProps> }[] = [];
  let notFound: Component<CommonProps>;
  let lastPath = '/';

  const addRoute = (route: { path: string; component: Component<CommonProps> }) => {
    routes.push(route);
  };

  const route = () => {
    const { pathname } = window.location;

    const currentRoute = routes.find(route => {
      return route.path === pathname;
    });

    if (!currentRoute) return notFound({});

    routerRoot.innerHTML = '';

    routerRoot.appendChild(currentRoute.component({}));
  };

  const navigate = (path: string) => {
    if (lastPath === path) return;

    window.history.pushState(null, '', path);
    lastPath = path;

    // path가 바뀔때마다 route메서드를 호출한다.
    route();
  };

  const setNotFound = (notFoundPage: Component<CommonProps>) => {
    notFound = notFoundPage;
  };

  return {
    addRoute,
    navigate,
    setNotFound,
  };
};

export default createRouter;
