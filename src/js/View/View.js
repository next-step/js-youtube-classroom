import { on, emit } from "../helpers.js"

export default class View {
  constructor(element) {
    if (!element) throw "no element"
    this.element = element
    this.originalDisplay = this.element.style.display || ""
    return this 
  }
  show(){
    this.element.style.display = this.originalDisplay
    return this
  }
  hide(element=this.element){
    element.style.display = 'none'
    return this
  }
  on(eventName, handler) {
    on(this.element, eventName, handler)
    return this
  }
  emit(eventName, data){
    emit(this.element, eventName, data)
    return this
  }
}