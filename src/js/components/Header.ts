import Component from "@/libs/component";
import { NAVIGATION_ID, BUTTON_HIGHLIGHT } from "@/utils/constants";
import { $, $$, removeClasses, addClass } from "@/utils/dom";
import { Navigations } from "@/types/index";

class Header extends Component {
  constructor($root: Element) {
    super();
    this.$root = $root;
  }

  bindEvents() {
    $("#navigation")?.addEventListener("click", (e) => {
      const target = e.target as HTMLButtonElement;
      const id = target.id as Navigations;
      if (!NAVIGATION_ID[id]) return;

      const buttonList = $$("button", this.$target);
      buttonList && removeClasses(buttonList, BUTTON_HIGHLIGHT);
      addClass(target, BUTTON_HIGHLIGHT);
    });
  }

  mount() {
    this.$target = document.createElement("header");
    this.$target.className = "text-center font-bold";

    this.$target.innerHTML = `
        <h2 class="text-center font-bold">👩🏻‍💻 나만의 유튜브 강의실 👨🏻‍💻</h2>
        <nav class="d-flex justify-center" id="navigation">
            <button class="btn bg-cyan-100 mx-1" id="later">👁️ 볼 영상</button>
            <button class="btn mx-1" id="watched">✅ 본 영상</button>
            <button id="search-button" class="btn mx-1">
            🔍 동영상 검색
            </button>
        </nav>
        `;
    this.$root.appendChild(this.$target);
  }
}

export default Header;
