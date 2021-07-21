import { qs, on, qsAll } from "../helpers.js"
import View from "./View.js"
import { watchTemplate } from "./Template.js"
import { STORAGETYPE } from "../util/Static.js"
const tag = "[LikedView]"

class LikedView extends View {
  constructor() {
    super(qsAll(".btn.mx-1")[2])
    this.bindEvents()
  }
  bindEvents(){
    on(this.element, "click", ()=> {
      qsAll(".btn.mx-1").forEach(el => el.classList.remove("bg-cyan-100"))
      this.element.classList.add("bg-cyan-100")
      const items = JSON.parse(localStorage.getItem(STORAGETYPE.VIDEOTYPE))
      history.pushState(items,"",'/liked')
      this.show()
    })
  }
  show(){
    const likedVideos =  history.state ? history.state.filter(data=> data.like===true) : []
    let page = qs(".mt-10 .video-wrapper") ? qs(".mt-10 .video-wrapper") : qs(".mt-10 .text-center")
    if (likedVideos.length<=0) {
      page.classList.remove("video-wrapper")
      page.classList.add("text-center")
      page.innerText = "영상이 없습니다. 😥 "
    } else {
      page.classList.remove("text-center")
      page.classList.add("video-wrapper")
      page.innerHTML = new Template().getList(likedVideos)
    }
  }
  render() {
    const likeVideos = JSON.parse(localStorage.getItem(STORAGETYPE.VIDEOTYPE))
    history.pushState(likeVideos, "", "/liked")
    this.show()
  }
}
class Template {
  getList(datas) {
    return datas.map((data) => watchTemplate(data,"opacity-hover","")).join('')
  }
}
const likedView = new LikedView()
export default likedView



