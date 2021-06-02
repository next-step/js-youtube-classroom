import Component from "@/libs/component";
import template, { emptyState, loadingState } from "@/templates/SearchResult";
import {
  SearchResultProps,
  SearchResultHandlers,
  SaveButton,
} from "@/types/index";
import {
  SEARCH_SELECTORS,
  SAVE_BUTTON_ID,
  SAVE_BUTTON_CAPTION,
  UNSAVE_BUTTON_CAPTION,
  DATA_OVERFLOW_MESSAGE,
} from "@/constants/index";
import { closest } from "@/utils/dom";
import popUpSnackBar from "@/utils/popUpSnackBar";

class SearchResult extends Component<
  unknown,
  SearchResultProps,
  SearchResultHandlers
> {
  constructor(
    $root: HTMLElement,
    props: SearchResultProps,
    handlers: SearchResultHandlers
  ) {
    super();
    this.$root = $root;
    this.props = props;
    this.handlers = handlers;
  }

  bindEvents(): void {
    this.$root.addEventListener("click", (e: Event) => {
      const $button = e.target as HTMLElement;
      const type = $button.id as SaveButton;

      if (!SAVE_BUTTON_ID[type]) return;
      if (type === SAVE_BUTTON_ID.save && this.props.storedDatas.size === 100) {
        popUpSnackBar(DATA_OVERFLOW_MESSAGE);
        return;
      }
      const $target = closest($button, SEARCH_SELECTORS.SEARCH_ITEM);
      if (!$target) return;

      const id = $target.dataset.id as string;
      const assignAction = {
        save: () => {
          $button.id = SAVE_BUTTON_ID.unsave;
          $button.innerText = UNSAVE_BUTTON_CAPTION;
        },
        unsave: () => {
          $button.id = SAVE_BUTTON_ID.save;
          $button.innerText = SAVE_BUTTON_CAPTION;
        },
      };
      assignAction[type]();
      this.handlers.onClickButton(id, type);
    });
  }

  mount(): void {
    if (this.props.datas.length === 0 && this.props.isLoading) {
      this.$root.innerHTML = loadingState;
      return;
    } else if (this.props.datas.length === 0 && !this.props.hasMore) {
      this.$root.innerHTML = emptyState;
      return;
    }
    this.$root.innerHTML = template(this.props.datas, this.props.storedDatas);
  }
}

export default SearchResult;
