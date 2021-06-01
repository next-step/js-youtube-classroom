import {observable, observe} from "~_core";

export abstract class Component<State = {}, Props = {}> {

  protected $state: State = {} as State;
  protected $components: Record<string, Component | Component[]> = {};
  private isRoot = false;

  constructor(
    protected readonly $target: HTMLElement,
    protected readonly $props: Props = {} as Props,
  ) {
    this.setup();
    this.$state = observable<State>(this.$state!);
    observe(() => this.render());
    this.setEvent();
    this.mounted();
  }
  protected setup() {}
  protected mounted() {}
  protected updated() {}
  protected initChildComponent(el: HTMLElement, componentName: string) { }
  protected abstract template(): string;
  protected setEvent() {}

  protected addEvent (eventType: string, selector: string, callback: Function) {
    this.$target.addEventListener(eventType, (e) => {
      const target = e.target as HTMLElement;
      const currentTarget = e.currentTarget as HTMLElement;
      const checked = target.closest(selector) || [ ...currentTarget.querySelectorAll(selector) ].includes(target);
      if (!checked) return;
      callback(e);
    })
  }

  private render() {
    this.$components = {};
    
    this.$target.innerHTML = this.template();
    this.$target.querySelectorAll('[data-component]')
                .forEach(el => this.setupChildComponent(el));

    this.updated();
  }

  private setupChildComponent(el: Element) {
    if (!(el instanceof HTMLElement)) return;
    if (!this.initChildComponent) return;

    const name: string = el.dataset.component!;
    const childComponent = this.initChildComponent(el, name) as Component | undefined;
    if (!childComponent) return;

    const {$components} = this;
    if (!$components[name]) {
      $components[name] = childComponent;
      return;
    }
    if ($components[name] instanceof Component) {
      $components[name] = [
        $components[name] as Component,
        childComponent
      ];
      return;
    }
    if (Array.isArray($components[name])) {
      ($components[name] as Component[]).push(childComponent);
      return;
    }
  }

  public setRoot() { this.isRoot = true; }
}
