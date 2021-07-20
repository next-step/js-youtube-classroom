import AppHeader from './AppHeader.js';
import SearchModal from './SearchModal.js';
class App {
  constructor({ $target }) {
    this.state = {
      isShowModal: false,
    };
    this.$app = document.createElement('div');
    this.$app.classList.add('app', 'd-flex', 'justify-center', 'mt-5', 'w-100');
    $target.append(this.$app);

    this.appHeader = new AppHeader({
      $app: this.$app,
      onClickSearchButton: this.openSearchModal,
    });
    this.searchModal = new SearchModal({
      $app: this.$app,
      state: this.state,
      onClickCloseButton: this.closeSearchModal,
    });
  }

  render = () => {
    this.appHeader.render();
    this.searchModal.render();
  };

  setState = nextState => {
    this.state = nextState;
    // this.appHeader.setState(this.state);
    this.searchModal.setState(this.state);
  };

  openSearchModal = () => {
    const nextState = { ...this.state };
    nextState['isShowModal'] = true;
    this.setState(nextState);
  };

  closeSearchModal = () => {
    const nextState = { ...this.state };
    nextState['isShowModal'] = false;
    this.setState(nextState);
  };
}

export default App;
