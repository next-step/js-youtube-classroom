import Component from "@/libs/component";
import template from "@/templates/ClassRoom";
import { closest } from "@/utils/dom";
import {
  CLASS_ROOM_ID,
  SEARCH_SELECTORS,
  REMOVE_CONFIRM_MESSAGE,
} from "@/constants/index";
import { ClassRoomProps, ClassRoomHandlers } from "@/types/index";

class ClassRoom extends Component<unknown, ClassRoomProps, ClassRoomHandlers> {
  constructor(
    readonly $root: HTMLElement,
    props: ClassRoomProps,
    readonly handlers: ClassRoomHandlers
  ) {
    super();
    this.props = props;
  }

  bindEvents(): void {
    this.$root.addEventListener("click", (e: Event) => {
      const target = e.target as HTMLElement;
      const type = target.id;
      if (!CLASS_ROOM_ID[type]) return;

      const $video = closest(target, SEARCH_SELECTORS.SEARCH_ITEM);
      const id = $video.dataset.id;
      if (!id) return;

      const assignAction = {
        [CLASS_ROOM_ID["watch-toggler"]]: (): void => {
          this.handlers.onToggleWatch(id);
        },
        [CLASS_ROOM_ID["like-toggler"]]: (): void => {
          this.handlers.onToggleLike(id);
        },
        [CLASS_ROOM_ID["remove-button"]]: (): void => {
          const check = confirm(REMOVE_CONFIRM_MESSAGE);
          if (check) this.handlers.onRemoveVideo(id);
        },
      };
      assignAction[type]();
    });
  }

  mount() {
    this.$root.innerHTML = template(this.props.filter, this.props.videoList);
  }
}

export default ClassRoom;
