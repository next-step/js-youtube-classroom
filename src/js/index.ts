import "../css/index.css";
import { $ } from "@/utils/dom";
import App from "@/App";

const render = ($target: HTMLElement): void => {
  const app = new App($target);
  app.render();
};

render($("#root"));
