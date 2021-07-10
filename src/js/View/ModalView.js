import { qs, on, qsAll } from "../helpers.js"
import View from "./View.js"

const tag = "[ModalView]"

export default class ModalView extends View{
  constructor(){
    // console.log(tag, "constructor")
    super(qs(".modal"))

    this.inputElement = qs("[type=text]", this.element)
    this.searchBtnElement = qs("[type=button]",this.element)
    
    // this.searchBtnElement = qs(".btn.bg-cyan-500",this.element)
    this.bindEvent()
    this.render()
  }
  bindEvent() {
    const BtnElement = qsAll(".btn", this.element)
    let clickEventTimer
    on(this.element, "submit", () => this.handleSubmit())
    on(this.element, "click", (event)=>{
      if(clickEventTimer) { clearTimeout(clickEventTimer) }
      clickEventTimer = setTimeout(()=>{
        if([...BtnElement].includes(event.target)){
          if(event.target === this.searchBtnElement){
            this.handleSubmit()
          } else {
            // console.log(event.target.dataset.videoId)
            this.handleSaveBtn(event.target, event.target.dataset.videoId)
          }
        }
      }, 200)
    })
  }
  handleSubmit(){
    console.log("호출됨")
   const {value} = this.inputElement
    this.emit("@submit", {value}) 
  }
  handleSaveBtn(saveBtnElement, value){
    super.hide(saveBtnElement)
    this.emit("@save",{value})
  }
  render(){
    const saveBtnElement = qsAll(".content-container.pt-2.px-1 .btn", this.element)
    const saveList = this.getCookie("videoLog")
    if(saveList){
      saveBtnElement.forEach((element)=> {
        saveList.includes(element.dataset.videoId) && this.hide(element)
      }) 
    }

  }
  getCookie(cookieName){
    try{
      const cookieValue = document.cookie
      .replace(/ /, "")
      .split(';')
      .map(el=>el.split('='))
      .find(row=> row[0].startsWith(cookieName))[1]
      .split(',')
      
      return cookieValue
    } catch(e){
      return false
    }
  }
}
