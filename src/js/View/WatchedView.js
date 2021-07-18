import { qs, on, qsAll } from "../helpers.js"
import View from "./View.js"
import { watchTemplate } from "./Template.js"
import { STORAGETYPE } from "../util/Static.js"
const tag = "[WatchedView]"

class WatchedView extends View {
  constructor() {
    super(qsAll(".btn.mx-1")[1])

    this.bindEvents()
  }

  bindEvents(){
    on(this.element, "click", ()=> {
      qsAll(".btn.mx-1").forEach(el => el.classList.remove("bg-cyan-100"))
      this.element.classList.add("bg-cyan-100")
      const items = JSON.parse(localStorage.getItem(STORAGETYPE.VIDEOTYPE))
      history.pushState(items,"",'watched')
      this.show()
    })
  }

  show(){
    const watchedVideos =  history.state ? history.state.filter(data=> data.watched===false) : []
    let page = qs(".mt-10 .video-wrapper") ? qs(".mt-10 .video-wrapper") : qs(".mt-10 .text-center")
    if (watchedVideos.length<=0) {
      page.classList.remove("video-wrapper")
      page.classList.add("text-center")
      page.innerText = "영상이 없습니다. 😥 "
    } else {
      page.classList.remove("text-center")
      page.classList.add("video-wrapper")
      page.innerHTML = new Template().getList(watchedVideos)
    }
  }
  render() {
    const towatchVideos = JSON.parse(localStorage.getItem(STORAGETYPE.VIDEOTYPE))
    history.pushState(towatchVideos, "", "/watched")
    this.show()
  }
}

class Template {
  getList(datas) {
    return datas.map((data) => watchTemplate(data,"")).join('')
  }
}
const watchedView = new WatchedView()
export default watchedView



