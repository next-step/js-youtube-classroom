import {Component} from "~_core/Component";

interface HeaderProps {
  modalOpen: () => void;
}

export class Header extends Component<{}, HeaderProps> {
  public template(): string {
    return `
      <h1 class="text-center font-bold">👩🏻‍💻 나만의 유튜브 강의실 👨🏻‍💻</h1>
      <nav class="d-flex justify-center">
        <button class="btn bg-cyan-100 mx-1">👁️ 볼 영상</button>
        <button class="btn mx-1">✅ 본 영상</button>
        <button id="search-button" class="btn mx-1">
          🔍 동영상 검색
        </button>
      </nav>
    `;
  }

  public setEvent() {
    this.addEvent('click', '#search-button', () => {
      this.$props.modalOpen();
    })
  }
}
