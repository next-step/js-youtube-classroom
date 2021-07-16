import { Like, ToWatch, Watched } from '../pages';
import createRouter from './createRouter';
import { HOME_PAGE, LIKE_PAGE, TO_WATCH_PAGE, WATCHED_PAGE } from './path';
import { createNode } from '../domHelper';

export const routerRoot = createNode('<div id="router-root"></div>');

const route = createRouter(routerRoot);

const { addRoute, setNotFound } = route;

addRoute({ path: HOME_PAGE, component: ToWatch });
addRoute({ path: TO_WATCH_PAGE, component: ToWatch });
addRoute({ path: WATCHED_PAGE, component: Watched });
addRoute({ path: LIKE_PAGE, component: Like });

// TODO: setNotFound();

export default route;
