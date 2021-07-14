import {getCookie, setCookie} from "../helpers.js"
import {APIKEY} from "../../../config.js"

const tag = "[Controller]"

const COOKIETYPE = {
  LOGCOOKOIE: "searchLog",
  VIDEOCOOKIE: "videoLog"
}
export default class Controller{

  constructor({modalView, modalSearchResult, modalScrollView, modalLatestKeywordList}){
    // console.log(tag, "controller")

    this.modalView = modalView
    this.modalSearchResult = modalSearchResult
    this.modalScrollView = modalScrollView
    this.modalLatestKeywordList = modalLatestKeywordList

    this.nextPageToken = ""
    this.beforeInputValue = ""
    this.subscribeViewEvents()
    this.render()
  }
  subscribeViewEvents(){
    this.modalView.on("@submit", event=> this.search(event.detail.value))
    this.modalView.on("@save", event=>this.saveVideo(event.detail.value))
    this.modalScrollView.on("@scroll", event => this.search(event.detail.value))
  }
  async search(value=""){
    // console.log("controller search")
    const data = await this.fetchData(value)
    this.nextPageToken = data.nextPageToken
    const newSearch = this.beforeInputValue === value
    this.beforeInputValue = value
    this.modalSearchResult.show(data.items, newSearch)
    this.saveLog(COOKIETYPE.LOGCOOKOIE,value)
    this.render()
  }
  fetchData(value=""){
    const str = encodeURI(value)
    return fetch(`https://www.googleapis.com/youtube/v3/search?key=${APIKEY.KEY}&q=${str}&pageToken=${this.nextPageToken}&part=snippet&maxResults=10&order=date`)
    .then(function(response) {
      return response.json();
    })
  }
  saveLog(logtype, keyword){ 
    const cookieValue = getCookie(logtype)
    if(!cookieValue){
      setCookie(logtype, [keyword])
    } else {
      if(!cookieValue.includes(keyword)){
        cookieValue.length>2 && cookieValue.shift()
        setCookie(logtype, [...cookieValue, keyword])
      }
    }
  }
  
  saveVideo(videoId){
    console.log("cookieValues")
    const cookieValues = getCookie(COOKIETYPE.VIDEOCOOKIE)
    if(!cookieValues){
      setCookie(COOKIETYPE.VIDEOCOOKIE,videoId)
    } else {
      cookieValues.length<=100 && setCookie(COOKIETYPE.VIDEOCOOKIE, [...cookieValues, videoId])
    }
  }
  render(){
    getCookie(COOKIETYPE.LOGCOOKOIE) && this.modalLatestKeywordList.show(getCookie(COOKIETYPE.LOGCOOKOIE))
  }
}