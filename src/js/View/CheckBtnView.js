import { qs, qsAll} from "../helpers.js";
import View from "./View.js"
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
      let deleteBtns = qsAll(".js-delete-button")
      if ([...saveBtns].includes(event.target)) {
        this.emit("@watch", {value: [event.target, qs(".btn.bg-cyan-100.mx-1")]})
      }else if ([...deleteBtns].includes(event.target)){
        const del = confirm("해당 영상을 삭제하시겠습니까?")
        console.log(del, "asdf")
        if(del){
          this.emit("@del", {value: [qs(".js-watched-button",event.target.parentNode).dataset.videoTitle, qs(".btn.bg-cyan-100.mx-1")]})
        }
        
      }
    })
  }
}

class Template {
  getList(datas) {
    return datas.map((data) => watchTemplate(data)).join('')
  }
}