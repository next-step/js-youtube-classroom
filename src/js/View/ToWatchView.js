import { qs, on, qsAll } from "../helpers.js"
import { STORAGETYPE } from "../util/Static.js"
import { watchTemplate } from "./Template.js"
import View from "./View.js"

const tag = "[ToWatchView]"

class ToWatchView extends View {
  constructor() {
    super(qsAll(".btn.mx-1")[0])
    this.body = qs("body")

    this.render()
    this.bindEvents()
  }
  bindEvents() {
    this.on("click", (event) => {
      qsAll(".btn.mx-1").forEach(el => el.classList.remove("bg-cyan-100"))
      this.element.classList.add("bg-cyan-100")
      this.render()
    })

  }

  showToWatch() {
    const towatchVideos = history.state ? history.state.filter(data => data.watched !== false) : []
    let page = qs(".mt-10 .video-wrapper") ? qs(".mt-10 .video-wrapper") : qs(".mt-10 .text-center")
    if (towatchVideos.length <= 0) {
      page.innerText = "영상이 없습니다. 😥 "
      page.classList.remove("video-wrapper")
      page.classList.add("text-center")
    } else {
      page.classList.remove("text-center")
      page.classList.add("video-wrapper")
      page.innerHTML = new Template().getList(towatchVideos)
    }
  }
  
  render() {
    const towatchVideos = JSON.parse(localStorage.getItem(STORAGETYPE.VIDEOTYPE))
    history.pushState(towatchVideos, "", "/to-watch")
    this.showToWatch()
  }
}


class Template {
  getList(datas) {
    return datas.map((data) => watchTemplate(data)).join('')
  }
}

const toWatchView = new ToWatchView()
export default toWatchView


