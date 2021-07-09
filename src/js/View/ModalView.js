import { qs, on } from "../helpers.js"
import View from "./View.js"

const tag = "[ModalView]"

export default class ModalView extends View{
  constructor(){
    // console.log(tag, "constructor")
    super(qs(".modal"))

    this.inputElement = qs("[type=text]", this.element)
    this.searchBtnElement = qs("[type=button]", this.element)

    this.bindEvent()
  }
  bindEvent() {
    on(this.element, "submit", event => this.handleSubmit(event))
    on(this.searchBtnElement, "click", (event)=>this.handleSubmit(event))
  }
  handleSubmit(event){
   const {value} = this.inputElement
    this.emit("@submit", {value}) 
  }
}
