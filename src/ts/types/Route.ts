import { CommonProps, Component } from './Component';

export interface Route {
  path: string;
  component: Component<CommonProps>;
}

export interface Router {
  (routes: Route[]): Element;
}
