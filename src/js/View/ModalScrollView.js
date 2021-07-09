import { on } from "../helpers.js";
import ModalView from "./ModalView.js";

const tag = "[ModalScrollView]"
export default class ModalScrollView extends ModalView {
  timer
  constructor(){
    super()
    // console.log(this.element, tag)
    this.bindEvent()
  }
  bindEvent(){
    on(this.element,"scroll", (event)=> {
      if(this.timer){
        clearTimeout(this.timer)
      }
      this.timer = setTimeout(()=> {
        this.handleScroll(event)
      },100)
    })
  }
  handleScroll(event){
    // console.log(this.element.scrollHeight, this.element.clientHeight, this.element.scrollTop, this.element.scrollHeight - this.element.clientHeight - this.element.scrollTop ===0)
    if(this.element.scrollHeight - this.element.clientHeight - this.element.scrollTop ===0){
      const {value} = this.inputElement
      // console.log(value,"inputElement")
      this.emit("@scroll", {value})
    }  
  }
}

