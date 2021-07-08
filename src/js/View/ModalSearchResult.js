import { qs } from "../helpers.js"
import View from "./View.js"

export default class ModalSearchResult extends View {
  constructor() {
    super(qs(".modal .video-wrapper"))
    this.template = new Template()
  }
  show(data = []) {
    // console.log(data, "ModalSearchResult")
    if(data.length>0){
      this.element.innerHTML = this.template.getList(data) 
    }
  }
}

class Template{
    getList(datas){
      console.log(datas, "ModalSearchResult")
      return datas.map(data=> `
        <article class="clip">
        <div class="preview-container">
          <iframe
            width="100%"
            height="118"
            src="https://www.youtube.com/embed/${data.id.videoId}"
            frameborder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowfullscreen
          ></iframe>
        </div>
        <div class="content-container pt-2 px-1">
          <h3>${data.snippet.title}</h3>
          <div>
            <a
              href="https://www.youtube.com/channel/${data.snippet.channelId}"
              target="_blank"
              class="channel-name mt-1"
            >
            ${data.snippet.channelTitle}
            </a>
            <div class="meta">
              <p>${data.snippet.publishTime.slice(0,4)}년 ${data.snippet.publishTime.slice(5,7)}월 ${data.snippet.publishTime.slice(8,10)}일</p>
            </div>
            <div class="d-flex justify-end">
              <button class="btn">⬇️ 저장</button>
            </div>
          </div>
        </div>
      </article>
    `)
  }
}