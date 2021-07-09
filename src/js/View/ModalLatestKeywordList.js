import ModalView from "./ModalView.js"
import  {qs, on} from "../helpers.js"

const tag = "[ModalLatestKeywordList]"

export default class ModalLatestKeywordList extends ModalView{
  constructor(){
    super()
    this.element = qs(".mt-2")
    this.template = new Template()
    this.show()
  }

  show(datas = []){
    this.element.innerHTML = this.template.getList(datas)
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