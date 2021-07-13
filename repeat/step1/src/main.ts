import {render} from "~@core/Render";
import {selectOne} from "~utils";
import {App} from "~App";
import "./assets/css/index.css";

render(
  selectOne('#app'),
  App
);
