import  {qs, on} from "../helpers.js"
import View from "./View.js"

const tag = "[ModalLatestKeywordList]"

export default class ModalLatestKeywordList extends View{
  constructor(){
    super(qs(".mt-2"))
    this.template = new Template()
    this.show()
  }

  show(datas = []){
    datas.length >0 && (this.element.innerHTML = this.template.getList(datas))
  }
}
class Template{
  getList(datas){
    return `
      <span id="latest-keyword-list" class="text-gray-700">최근 검색어: </span>
      ${datas.map(data=>`<a class="chip mx-2">${data}</a>`).join('')}
    `
  }
}