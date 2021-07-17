import { qs } from "../helpers.js"
import { STORAGETYPE } from "../util/Static.js"
import View from "./View.js"

const tag = "[ToWatchView]"

class ToWatchView extends View {
  constructor() {
    super(qs(".btn.bg-cyan-100.mx-1"))

    this.bindEvents()
  }
  bindEvents() {
    this.on("click", () => {
      this.showToWatch()
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
      page.idList
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
    return datas.map((data) => `
    <article class="clip js-video relative">
        <div class="preview-container">
              <iframe class="js-preview" width="100%" height="118" src="https://www.youtube.com/embed/${data.videoId}" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen=""></iframe>
            </div>
            <div class="content-container pt-2 px-1">
              <h3>${data.videoTitle} M/V</h3>
              <div>
                <a href="https://www.youtube.com/channel/${data.channelId}" target="_blank" class="channel-name mt-1">
                ${data.channelTitle}
                </a>
                <div class="meta">
                  <p>${data.publishTime.slice(0,4)}년,${data.publishTime.slice(5,7)}월 ${data.publishTime.slice(8,10)}일 </p>
                </div>
              </div>
            </div>
            <div class="button-list d-flex justify-end">
              <span class="opacity-hover ml-2 js-watched-button">✅</span>
              <span class="opacity-hover ml-2 js-liked-button">👍🏻</span>
              <span class="opacity-hover ml-2 js-delete-button">🗑</span>
            </div>
          </article>
        `).join('')
  }
}
const toWatchView = new ToWatchView()
export default toWatchView