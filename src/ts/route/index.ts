import { Like, ToWatch, Watched } from '../pages';
import createRouter from './createRouter';
import { HOME_PAGE, LIKE_PAGE, TO_WATCH_PAGE, WATCHED_PAGE } from './path';
import { createNode } from '../domHelper';

const route = createRouter();

export default route;
