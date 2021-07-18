import { qs, on, qsAll } from "../helpers.js"
import { STORAGETYPE } from "../util/Static.js"
import { watchTemplate } from "./Template.js"
import View from "./View.js"

const tag = "[ToWatchView]"

export default class ToWatchView extends View {
  constructor() {
    super(qs(".btn.bg-cyan-100.mx-1"))
    this.render()

    this.bindEvents()
  }
  bindEvents() {
    this.on("click", () => {
      this.showToWatch()
    })
    on(qs("section"), "click", (event) => {
      const watchedBtn = qsAll(".opacity-hover.ml-2.js-watched-button")
      if([...watchedBtn].includes(event.target)){
        const nthChild = [...watchedBtn].indexOf(event.target)
        const items = JSON.parse(localStorage.getItem(STORAGETYPE.VIDEOTYPE))
        items[nthChild].watched="false"
        localStorage.setItem(STORAGETYPE.VIDEOTYPE, JSON.stringify(items))
        event.target.parentNode.parentNode.style.display="none"
      }
    })
  }
  showToWatch() {
    const toWathVideos = history.state
    let page = qs(".mt-10 .video-wrapper") ? qs(".mt-10 .video-wrapper") : qs(".mt-10 .text-center")
    if (!toWathVideos) {
      page.innerText = "영상이 없습니다. 😥 "
      page.classList.remove("video-wrapper")
      page.classList.add("text-center")
    } else {
      page.classList.remove("text-center")
      page.classList.add("video-wrapper")

      page.innerHTML = new Template().getList(toWathVideos)
    }
  }
  render() {
    const toWathVideos = JSON.parse(localStorage.getItem(STORAGETYPE.VIDEOTYPE))
    history.pushState(toWathVideos, "", "/to-watch")
    this.showToWatch()
  }
}


class Template {
  getList(datas) {
    return datas.map((data) => {
      if(data.watched===undefined){
        return watchTemplate(data)
      }
    }).join('')
  }
}



