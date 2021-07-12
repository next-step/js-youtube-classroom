import { qs, on, qsAll, getCookie } from "../helpers.js"
import View from "./View.js"

const tag = "[ModalView]"

export default class ModalView extends View{
  constructor(){
    super(qs(".modal"))

    this.inputElement = qs("[type=text]", this.element)
    this.searchBtnElement = qs("[type=button]",this.element)
    
    this.bindEvent()
    this.render()
  }
  bindEvent() {
    const BtnElement = qsAll(".btn", this.element)
    let clickEventTimer
    on(this.element, "submit", (event) => this.handleSubmit(event))
    on(this.element, "click", (event)=>{
      if(clickEventTimer) { clearTimeout(clickEventTimer) }
      clickEventTimer = setTimeout(()=>{
        if([...BtnElement].includes(event.target)){
          if(event.target === this.searchBtnElement){
            this.handleSubmit()
          } else {
            this.handleSaveBtn(event.target, event.target.dataset.videoId)
          }
        }
      }, 200)
    })
  }
  handleSubmit(event){
   const {value} = this.inputElement
    this.emit("@submit", {value}) 
  }
  handleSaveBtn(saveBtnElement, value){
    super.hide(saveBtnElement)
    this.emit("@save",{value})
  }
  render(){
    const saveBtnElement = qsAll(".content-container.pt-2.px-1 .btn", this.element)
    const saveList = getCookie("videoLog")
    if(saveList){
      saveBtnElement.forEach((element)=> {
        saveList.includes(element.dataset.videoId) && this.hide(element)
      }) 
    }
  }
}
