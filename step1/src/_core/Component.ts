import {observable} from "~_core/Observer";

export class Component<State, Props> {

  protected $state?: State;

  constructor(
    protected readonly $target: HTMLElement,
    protected readonly $props?: Props,
  ) {
    this.setup();
    this.$state = observable(this.$state);
    this.render();
    this.mounted();
  }

  public setup () {}
  public mounted () {}
  public updated () {}
  public template () {
    return '';
  }

  public render () {
    const $target: HTMLElement = this.$target.cloneNode() as HTMLElement;
    $target.innerHTML = this.template();
    this.$target.replaceWith($target);
    this.updated();
  }
}