class SearchModal {
  constructor({ $app, state, onClickCloseButton }) {
    this.state = state;
    this.state['videos'] = [];
    this.onClickCloseButton = onClickCloseButton;
    this.$searchModal = document.createElement('div');
    this.$searchModal.id = 'video-search-modal';
    $app.append(this.$searchModal);
    this.$searchModal.addEventListener('click', this.onClick);
    this.$searchModal.addEventListener('submit', this.onSubmit);
  }

  render = () => {
    const { isShowModal, videos } = this.state;
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
    this.$searchModal.innerHTML += videos.map(video => {
      return `
        <article class="clip js-video relative" data-video-id="">
        <div class="preview-container">
            <iframe class="js-preview" width="100%" height="118" src="https://www.youtube.com/embed/ifjs0UX56ZA" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
        </div>
        <div class="content-container pt-2 px-1">
            <h3>${video.snipet.title} #shorts</h3>
            <div>
            <a href="https://www.youtube.com/channel/UCtp1okjd3xQAhPNY8Wgt_Fg" target="_blank" class="channel-name mt-1">
            문월 유튜브
            </a>
            <div class="meta">
                <p>2021년 5월 2일</p>
            </div>
            </div>
        </div>
        <div class="button-list d-flex justify-end">
            <button class="btn js-save-cancel-button" }="">↪️ 저장 취소</button>
        </div>
        </article>
      `;
    });
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

  onSubmit = e => {
    e.preventDefault();
    console.log('submit');
    this.searchVideo();
  };

  searchVideo = () => {
    const requestOptions = {
      method: 'GET',
      redirect: 'follow',
    };

    fetch(
      'https://youtube.googleapis.com/youtube/v3/search?part=snippet&maxResult=25&q=제로투&key=',
      requestOptions
    )
      .then(response => response.json())
      .then(result => {
        console.log(result.items);
        const nextState = {
          ...this.state,
        };
        nextState['videos'] = result.items;
        this.setState(nextState);
      })
      .catch(error => console.log('error', error));
  };
}

export default SearchModal;
