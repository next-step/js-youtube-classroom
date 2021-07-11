import ModalController from "./modal/ModalController.js";
import { getYoutubeResult } from "./API.js"
import { $, $$ } from "./utils.js";

export default class App {
    constructor(){
        this.ModalController = new ModalController()
    }
}


