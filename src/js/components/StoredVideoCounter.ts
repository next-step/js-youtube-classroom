import Component from "@/libs/component";
import { StoredVideoCounterProps } from "@/types/index";

class StoredVideoCounter extends Component<unknown, StoredVideoCounterProps> {
  constructor(readonly $root: HTMLElement, props: StoredVideoCounterProps) {
    super();
    this.props = props;
  }

  mount(): void {
    this.$root.innerHTML = `저장된 영상 갯수: ${this.props.storedVideoCount} / 100개`;
  }
}

export default StoredVideoCounter;
