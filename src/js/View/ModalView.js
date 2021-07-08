import { qs, on } from "../helpers.js"
import View from "./View.js"

const tag = "[ModalView]"

export default class ModalView extends View{
  constructor(){
    console.log(tag, 'View')

    super(qs(".modal"))
    this.inputElement = qs("[type=text]", this.element)
    this.searchBtnElement = qs("[type=button]", this.element)
    this.bindEvent()
  }
  bindEvent() {
    on(this.element,"submit", (event) =>this.handleSubmit(event))
    on(this.searchBtnElement, "click", (event)=>this.handleSubmit(event))
  }
  handleSubmit(event){
    event.preventDefault()
    const {value} = this.inputElement
    // console.log(tag, "handleSubmit", value)
    this.emit("@submit", {value}) 
  }
}
