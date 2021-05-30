import {observable} from "~_core/Observer";

export class Component<State = {}, Props = {}> {

  protected $state?: State;
  private isRoot = false;

  constructor(
    protected readonly $target: HTMLElement,
    protected readonly $props: Props = {} as Props,
  ) {
    this.setup();
    this.$state = observable<State>(this.$state!);
    this.render();
    this.setEvent();
    this.mounted();
  }

  private setup () {}
  public setRoot () {
    this.isRoot = true;
  }
  protected mounted () {}
  protected updated () {}
  protected initChildComponent(el: HTMLElement, componentName: string) {}
  protected template () {
    return '';
  }
  protected setEvent () {}
  protected addEvent (eventType: 'click', selector: string, callback: Function) {
    this.$target.addEventListener(eventType, (e) => {
      const target = e.target as HTMLElement;
      const currentTarget = e.currentTarget as HTMLElement;
      const checked = target.closest(selector) || [ ...currentTarget.querySelectorAll(selector) ].includes(target);
      if (!checked) return;
      callback(e);
    })
  }

  protected render () {
    const $target: HTMLElement = this.isRoot
                                    ? this.$target.cloneNode(true) as HTMLElement
                                    : this.$target;

    $target.innerHTML = this.template();
    $target.querySelectorAll('[data-component]')
           .forEach((el) => {
             if (el instanceof HTMLElement) {
               this.initChildComponent(el, el.dataset.component!)
             }
           });

    if (this.isRoot) {
      this.$target.replaceWith($target);
    }

    this.updated();
  }
}