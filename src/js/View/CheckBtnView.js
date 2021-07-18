import { qs, qsAll} from "../helpers.js";
import View from "./View.js"
import { STORAGETYPE } from "../util/Static.js";
export default class CheckBtnView extends View {
  constructor(){
    super(qs("body"))

    this.bindEvents()
    this.show()
    this.template = new Template()
  }
  bindEvents(){
    this.on("click", (event) => {
      let saveBtns = qsAll(".js-watched-button")
      if ([...saveBtns].includes(event.target)) {
        this.emit("@watch", {value: [event.target, qs(".btn.bg-cyan-100.mx-1")]})
      }
    })
  }
}

class Template {
  getList(datas) {
    return datas.map((data) => watchTemplate(data)).join('')
  }
}