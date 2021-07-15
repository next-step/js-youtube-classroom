
import {APIKEY} from "../../../config.js"
import {data} from "../fakeObject.js"
import {STORAGETYPE} from "../util/Static.js"
const tag = "[Controller]"


export default class Controller{

  constructor({modalView, modalSearchResult, modalScrollView, modalLatestKeywordList}){

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
    // this.modalView.on("@save", event=>this.saveVideo(event.detail.value))
    // this.modalScrollView.on("@scroll", event => this.search(event.detail.value))
  }
  async search(value=""){
    this.saveLog(STORAGETYPE.SEARCHTYPE, value)
    // const data = await this.fetchData(value)
    // this.nextPageToken = data.nextPageToken
    // const newSearch = this.beforeInputValue === value
    // this.beforeInputValue = value
    // this.modalSearchResult.show(data.items, newSearch)
    
    this.render()
  }
  fetchData(value=""){
    // const str = encodeURI(value)
    // return fetch(`https://www.googleapis.com/youtube/v3/search?key=${APIKEY.KEY}&q=${str}&pageToken=${this.nextPageToken}&part=snippet&maxResults=10&order=date`)
    // .then(function(response) {
    //   return response.json();
    // })
  }
  saveLog(logtype, keyword){ 
    let items = JSON.parse(localStorage.getItem(logtype))
    if(items) { 
      if(!items.includes(keyword)) items.push(keyword)
      if(items.length>3) items.shift()
    } 
    else items = [keyword]
    localStorage.setItem(logtype, JSON.stringify(items))
  }
  
  saveVideo(videoId){
    // const cookieValues = getCookie(COOKIETYPE.VIDEOCOOKIE)
    // if(!cookieValues){
    //   setCookie(COOKIETYPE.VIDEOCOOKIE,videoId)
    // } else {
    //   cookieValues.length<=100 && setCookie(COOKIETYPE.VIDEOCOOKIE, [...cookieValues, videoId])
    // }
  }
  render(){
    let items = JSON.parse(localStorage.getItem(STORAGETYPE.SEARCHTYPE))
    items && this.modalLatestKeywordList.show(items)
  }
}