import { qs } from "../helpers.js"
import View from "./View.js"

export default class ModalSearchResult extends View {
  constructor() {
    super(qs(".modal .video-wrapper"))
    this.template = new Template()
    this.data = []
    // console.log(this.element.innerHTML,"innerHTML")
  }
  show(newData = []) {
    // console.log(data, "ModalSearchResult")
    if(newData.length>0){
      this.element.classList.add("video-wrapper")
      this.data.push(...newData)
      this.element.innerHTML = this.template.getSkeleton().repeat(this.data.length)
      setTimeout(()=>{this.element.innerHTML = this.template.getList(this.data)}, 1000)
      
    } else {
      this.element.classList.remove("video-wrapper")
      this.element.innerHTML =this.template.getEmptyList()
    }
  }
  showSkeleton(dataLen){
    this.element.innerHTML = this.template.getSkeleton().repeat(dataLen)
  }
}

class Template{
  getEmptyList(){
    return `
      <div style="display:flex; align-items:center; flex-direction: column;">
        <img src="/src/images/status/not_found.png" style="width:30%"/>
        <h3 class="font-bold">검색 결과가 존재하지 않습니다.</h2>
      </div>
    `
  }
    getList(datas){
      // console.log(this.element.innerHTML, "ModalSearchResult")
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
              <button class="btn" data-video-id="${data.id.videoId}">⬇️ 저장</button>
            </div>
          </div>
        </div>
      </article>
    `).join('')
  }
  getSkeleton(){
    return `
      <article class="clip skeleton">
      <div class="preview-container image">
      <div></div>
      </div>
      <div class="content-container pt-2">
      <div>
          <div class="meta line">
          <p></p>
          </div>
          <div class="d-flex justify-end line mt-3"></div>
      </div>
      </div>
  </article>`;
  }

}