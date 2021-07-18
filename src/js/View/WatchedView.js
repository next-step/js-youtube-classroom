import { qs, on, qsAll } from "../helpers.js"
import { STORAGETYPE } from "../util/Static.js"
import { watchTemplate } from "./Template.js"
import View from "./View.js"

const tag = "[WatchedView]"

export default class WatchedView extends View {
  constructor() {
    super()
    this.bindEvents()
    console.log(tag)
  }
  bindEvents() {
    this.on("click", () => {
      console.log("yess")
    })
  }
  
}



