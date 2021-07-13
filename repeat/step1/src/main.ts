import {render} from "~@core/Render";
import {selectOne} from "~utils";
import {App} from "~App";
import "./assets/css/index.css";

const $root = selectOne('#app');

render($root, App());