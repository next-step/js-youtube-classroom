import { Router } from "~@core";

import {HomePage, LikedPage, ViewedPage} from "~pages";

export const router = new Router({
  routes: {
    '/': HomePage,
    '/viewed': ViewedPage,
    '/liked': LikedPage,
  },
  hash: true,
});