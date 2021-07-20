class AppHeader {
  constructor({ $app, state, onClickSearchButton }) {
    this.onClickSearchButton = onClickSearchButton;
    this.$appHeader = document.createElement('div');
    this.$appHeader.className = 'app-header';
    $app.append(this.$appHeader);
    this.$appHeader.addEventListener('click', this.onClick);
  }

  render = () => {
    this.$appHeader.innerHTML = `
        <header class="my-4">
            <h2 class="text-center font-bold">👩🏻‍💻 나만의 유튜브 강의실 👨🏻‍💻</h2>
            <nav id="mode-wrapper" class="d-flex justify-between">
                <div id="video-filter">
                    <button id="to-watch-video-display-button" class="video-display-button btn mx-1">
                        👁️ 볼 영상
                    </button>
                    <button id="watched-video-display-button" class="video-display-button btn mx-1">
                        ✅ 본 영상
                    </button>
                    <button id="liked-video-display-button" class="video-display-button btn mx-1">
                        👍🏻 좋아요 한 영상
                    </button>
                </div>
                <button id="search-button" class="btn mx-1 rounded-full">
                    🔍
                </button>
            </nav>
        </header>
    `;
  };

  onClick = ({ target }) => {
    if (target.matches('#search-button')) {
      this.onClickSearchButton();
      return;
    }
  };
}

export default AppHeader;
