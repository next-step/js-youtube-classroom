import "../css/index.css";
import App from "@/App";

const render = ($target: Element | null) => {
  if ($target) {
    const app = new App($target);
    app.render();
  }
};

render(document.getElementById("app"));
