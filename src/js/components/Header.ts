import Component from "@/libs/component";

class Header extends Component {
  constructor($root: Element) {
    super();
    this.$root = $root;
  }

  bindEvents() {}
  mount() {
    this.$target = document.createElement("header");
    this.$target.className = "text-center font-bold";
    this.$target.textContent = "👩🏻‍💻 나만의 유튜브 강의실 👨🏻‍💻";

    this.$target.innerHTML = `
        <h2 class="text-center font-bold">👩🏻‍💻 나만의 유튜브 강의실 👨🏻‍💻</h2>
        <nav class="d-flex justify-center">
            <button class="btn bg-cyan-100 mx-1">👁️ 볼 영상</button>
            <button class="btn mx-1">✅ 본 영상</button>
            <button id="search-button" class="btn mx-1">
            🔍 동영상 검색
            </button>
        </nav>
        `;
    this.$root?.appendChild(this.$target);
  }
}

export default Header;
