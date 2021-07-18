import { qs, on } from "../helpers.js"
import View from "./View.js"
import { STORAGETYPE } from "../util/Static.js"
import ToWatchView from "./ToWatchView.js"
const tag = "[MainView]"

export default class MainView extends View {
  constructor() {
    super(qs("body"))
    this.searchButton = qs("#search-button")
    this.modalClose = qs(".modal-close")
    this.modal = qs(".modal")
    this.toWathView = new ToWatchView()
    this.bindEvents()
    this.render()
  }
  bindEvents() {
    on(this.searchButton, "click", () => this.onModalShow());
    on(this.modalClose, "click", () => this.onModalClose());
    on(this.modal, "submit", (event) => { event.preventDefault() })
    on(this.modal, 'click', (event) => {
      if (event.target === this.modal)
        return this.onModalClose()
    })
  }
  onModalShow() {
    this.modal.classList.add("open")
  }
  onModalClose() {
    this.modal.classList.remove("open")
    this.render()
  }
  render(){
    this.toWathView.render()
  }
}
