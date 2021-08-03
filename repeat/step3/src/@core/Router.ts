import {observable} from "./render";

export interface RouterProps {
  baseUrl?: string;
  routes: Record<string, Function>;
  hash?: boolean;
}

export class Router {

  public readonly baseUrl: string;
  public readonly routes: Record<string, Function>;
  private readonly hash: boolean;
  private readonly selectedRoute: Record<string, string> = observable({ value: '/' });
  private readonly beforeUpdate: Set<Function> = new Set();

  constructor({ baseUrl = '/', routes = {}, hash = true }: RouterProps) {
    this.baseUrl = baseUrl;
    this.routes = routes;
    this.hash = hash;
  }

  public setup() {
    this.updateRoute();
    window.addEventListener('popstate', this.updateRoute);
  }

  private updateRoute = () => {
    requestAnimationFrame(() => {
      const { routes, selectedRoute, path } = this;
      this.beforeUpdate.forEach(fn => fn());

      const selectedRouteValue = Object.keys(routes).find(v => {
        return new RegExp(
          `^${v.replace(/:\w+/gi, '\\w+').replace(/\//, "\\/")}$`,
          'g'
        ).test(path);
      });

      if (!selectedRouteValue) return;
      selectedRoute.value = selectedRouteValue;
    })
  }

  public get route() {
    return this.routes[this.selectedRoute.value];
  }

  public get path() {
    const path = (
      this.hash
        ? location.hash.replace('#!', '')
        : location.pathname
    ) || '/';

    const reg = new RegExp(`^${this.baseUrl}\/?`);

    return path.replace(reg, '/');
  }

  public get params(): Record<string, string> {
    const { selectedRoute, path } = this;
    if (!selectedRoute) return {};

    const keys = [ ...selectedRoute.value!.matchAll(/:(\w+)/g) ].map(v => v[1]);
    const valuePaths = path.split('/');
    const routePaths = selectedRoute.value!.split('/');

    return keys.reduce((obj: Record<string, string>, key) => {
      const index = routePaths.findIndex(v => key === `/:${v}`);
      obj[key] = valuePaths[index];
      return obj;
    }, {});
  }

  public push(path: string) {
    const { hash, baseUrl } = this;
    const fullUrl = `${baseUrl.replace(/^\/?/, '/').replace(/\/$/, '')}/${path.replace(location.origin, '').replace(/^\/?/, '')}`;
    if (hash) {
      location.hash = `#!${fullUrl}`;
    } else {
      history.pushState(null, document.title, fullUrl);
      this.updateRoute();
    }
  }

  public beforeRouterUpdate(fn: Function) {
    this.beforeUpdate.add(fn);
  }

}