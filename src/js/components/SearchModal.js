class SearchModal {
  constructor({ $app, state, onClickCloseButton }) {
    this.state = state;
    this.onClickCloseButton = onClickCloseButton;
    this.$searchModal = document.createElement('div');
    this.$searchModal.id = 'video-search-modal';
    $app.append(this.$searchModal);
    this.$searchModal.addEventListener('click', this.onClick);
  }

  render = () => {
    const { isShowModal } = this.state;
    this.$searchModal.innerHTML = `
        <div class="modal ${isShowModal && 'open'}" }>
            <div id="modal-inner" class="modal-inner p-8">
            <button id="modal-close-button" class="modal-close">
                <svg viewBox="0 0 40 40">
                <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30"></path>
                </svg>
            </button>
            <header>
                <h2 class="text-center">🔎 유튜브 검색</h2>
            </header>
            <form id="video-search-form" class="d-flex">
                <input id="video-search-input" type="text" class="w-100 mr-2 pl-2" name="video-search-input" placeholder="검색" required="">
                <button id="video-search-submit" type="submit" class="btn bg-cyan-500" name="video-search-submit">
                검색
                </button>
            </form>
            <section id="latest-keyword-list" class="mt-2"><span class="text-gray-700">최근 검색어: </span>
            <span class="js-latest-keyword chip">최근검색키워드</span></section>
            <section>
                <div class="d-flex justify-end text-gray-700">
                저장된 영상 개수:&nbsp;<span id="saved-video-count">3 / 100</span>
                </div>
                <section id="video-search-result" class="video-wrapper"></section>
            </section>
            </div>
        </div>
    `;
  };

  setState = nextState => {
    this.state = nextState;
    this.render();
  };

  onClick = ({ target }) => {
    if (target.matches('.close-x')) {
      this.onClickCloseButton();
      return;
    }
  };
}

export default SearchModal;
