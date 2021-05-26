import { videoInfos } from "../states/videoInfos.js";
import { videoListType } from "../states/videoListType.js";
import { renderSavedVideoList } from "../viewControllers/app.js";
import { $$ } from "../utils/DOM.js";

export function handleModeChange({ target }) {
  const $$videoDisplayButtons = $$(".video-display-button");
  const type = target.id.replace("-video-display-button", "");

  $$videoDisplayButtons.forEach(($button) =>
    $button.classList.remove("bg-cyan-100")
  );
  target.classList.add("bg-cyan-100");
  videoListType.set(type);
  renderSavedVideoList([...videoInfos.get()]);
}
