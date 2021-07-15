import { qs, on, qsAll } from "../helpers.js"
import View from "./View.js"

const tag = "[ModalView]"

export default class ModalView extends View {
  constructor() {
    super(qs(".modal"))

    this.inputElement = qs("[type=text]", this.element)
    this.searchBtnElement = qs("[type=button]", this.element)

    this.bindEvent()
  }
  bindEvent() {

    let clickEventTimer
    on(this.element, "submit", (event) => this.handleSubmit(event))
    on(this.element, "click", (event) => {
      const BtnElement = qsAll(".btn", this.element)
      if (clickEventTimer) { clearTimeout(clickEventTimer) }
      clickEventTimer = setTimeout(() => {
        if ([...BtnElement].includes(event.target)) {
          if (event.target === this.searchBtnElement) {
            this.handleSubmit()
          } else {
            this.handleSaveBtn(event.target, event.target.dataset.videoId)
          }
        }
      }, 200)
    })
  }
  handleSubmit() {
    const { value } = this.inputElement
    this.emit("@submit", { value })
  }
  handleSaveBtn(saveBtnElement, value) {
    this.emit("@save", { value })
    this.hide(saveBtnElement)
  }
}
