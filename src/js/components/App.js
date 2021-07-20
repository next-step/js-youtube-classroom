import AppHeader from './AppHeader.js';
class App {
  constructor({ $target, state = {} }) {
    this.state = state;
    this.$app = document.createElement('div');
    this.$app.classList.add('app', 'd-flex', 'justify-center', 'mt-5', 'w-100');
    $target.append(this.$app);

    this.appHeader = new AppHeader({ $app: this.$app });
  }

  render = () => {
    this.appHeader.render();
  };

  setState = nextState => {
    this.state = nextState;
    this.render();
  };
}

export default App;
