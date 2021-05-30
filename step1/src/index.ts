import "./assets/css/index.css";
import { App } from "~App";
import { youtubeService } from "~services/YoutubeService";

new App(document.querySelector('#app')!);

youtubeService.search('포동이').then(console.log);
