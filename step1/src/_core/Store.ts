import {observable} from "~_core/Observer";

export class Store<State> {

  public $state: State;
  private readonly mutations: Record<string, Function>;
  private readonly actions: Record<string, Function>;

  constructor({ state, mutations, actions }: { state: State, mutations: Record<string, Function>, actions: Record<string, Function> }) {
    this.$state = observable(state);
    this.mutations = mutations;
    this.actions = actions;
  }

  public commit(type: string, ...params: unknown[]): void {
    this.mutations[type](this.$state, ...params);
  }

  public dispatch(type: string, ...params: unknown[]): unknown {
    return this.actions[type]({
      state: Object.freeze(this.$state),
      commit: this.commit.bind(this),
      dispatch: this.dispatch.bind(this),
    }, ...params);
  }

}