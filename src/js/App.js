import Modal from "./modal/Modal.js";
import MainPage from "./main/MainPage.js";

export default class App {
  constructor() {
    this.Modal = new Modal();
    this.MainPage = new MainPage();
  }
}
