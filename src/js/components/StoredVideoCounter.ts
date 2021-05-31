import Component from "@/libs/component";
import { StoredVideoCounterProps } from "@/types/index";

class StoredVideoCounter extends Component {
  props: StoredVideoCounterProps;
  constructor($root: Element, props: StoredVideoCounterProps) {
    super();
    this.$root = $root;
    this.props = props;
  }

  mount() {
    this.$root.innerHTML = `저장된 영상 갯수: ${this.props.storedVideoCount} 개`;
  }
}

export default StoredVideoCounter;
