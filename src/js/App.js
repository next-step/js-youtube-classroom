import Modal from "./modal/Modal.js";
import MainPage from "./main/MainPage.js";
import { $, $$ } from "./utils.js";

export default class App {
    constructor(){


        this.state = {
            savedVideos: [],
        }


        this.Modal = new Modal()

        this.MainPage = new MainPage()
    }


}


