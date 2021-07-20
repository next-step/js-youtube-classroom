import { Router } from "~@core";

import {HomePage, ViewedPage} from "~pages";

export const router = new Router({
  routes: {
    '/': HomePage,
    '/viewed': ViewedPage,
  },
  hash: true,
});