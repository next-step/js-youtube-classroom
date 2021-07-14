import Modal from "./modal/Modal.js";
import MainPage from "./main/MainPage.js";
import { $, $$ } from "./utils.js";

export default class App {
    Modal; MainPage;
    constructor(){
        this.Modal = new Modal()
        this.MainPage = new MainPage()
    }
}
