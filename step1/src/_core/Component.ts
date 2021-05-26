import {observable} from "~_core/Observer";

document.body.addEventListener('click', (e: MouseEvent) => {

})

export class Component<State = {}, Props = {}> {

  protected $state?: State;

  constructor(
    protected readonly $target: HTMLElement,
    protected readonly $props?: Props,
  ) {
    this.setup();
    this.$state = observable<State>(this.$state!);
    this.render();
    this.setEvent();
    this.mounted();
  }

  public setup () {}
  public mounted () {}
  public updated () {}
  public template () {
    return '';
  }
  public setEvent () {}
  public addEvent (eventType: 'click', selector: string, callback: Function) {
    this.$target.addEventListener(eventType, (e) => {
      const target = e.target as HTMLElement;
      const currentTarget = e.currentTarget as HTMLElement;
      const checked = target.closest(selector) || [ ...currentTarget.querySelectorAll(selector) ].includes(target);
      if (!checked) return;
      callback(e);
    })
  }

  public render () {
    const $target: HTMLElement = this.$target.cloneNode() as HTMLElement;
    $target.innerHTML = this.template();
    this.$target.replaceWith($target);
    this.updated();
  }
}