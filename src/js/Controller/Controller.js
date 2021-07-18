
import {APIKEY} from "../../../config.js"
import {data} from "../fakeObject.js"
import {STORAGETYPE} from "../util/Static.js"
import {qsAll} from "../helpers.js"
import toWatchView from "../View/ToWatchView.js"
import watchedView from "../View/WatchedView.js"

const tag = "[Controller]"


export default class Controller{

  constructor({modalView, modalSearchResult, modalScrollView, modalLatestKeywordList, checkBtnView}){

    this.modalView = modalView
    this.modalSearchResult = modalSearchResult
    this.modalScrollView = modalScrollView
    this.modalLatestKeywordList = modalLatestKeywordList
    this.checkBtnView = checkBtnView

    this.nextPageToken = ""
    this.beforeInputValue = ""
    this.subscribeViewEvents()
    this.render()
  }
  subscribeViewEvents(){
    this.modalView.on("@submit", event=> this.search(event.detail.value))
    this.modalView.on("@save", event=>this.saveVideo(event.detail.value))
    this.modalScrollView.on("@scroll", event => this.search(event.detail.value))
    this.checkBtnView.on("@watch", event=>this.checkBtnClick(event.detail.value))

  }
  async search(value=""){
    this.saveLog(STORAGETYPE.SEARCHTYPE, value)
    // const data = await this.fetchData(value)
    this.nextPageToken = data.nextPageToken
    const newSearch = this.beforeInputValue !== value
    this.beforeInputValue = value
    // this.modalSearchResult.show(data.items, newSearch)
    this.modalSearchResult.show(data.items, true)
  
    this.render()
  }
  fetchData(value=""){
    const str = encodeURI(value)
    return fetch(`https://www.googleapis.com/youtube/v3/search?key=${APIKEY.KEY1}&q=${str}&pageToken=${this.nextPageToken}&part=snippet&maxResults=10&order=date`)
    .then(function(response) {
      return response.json();
    })
  }
  saveLog(logtype, keyword){ 
    let items = JSON.parse(localStorage.getItem(logtype))
    if(items) { 
      if(items.includes(keyword)){
        const idx = items.indexOf(keyword)
        items.splice(idx,1)
      }
      items.push(keyword)
      if(items.length>3) items.shift()
    } 
    else items = [keyword]
    localStorage.setItem(logtype, JSON.stringify(items))
  }
  saveVideo(video){
    let items = JSON.parse(localStorage.getItem(STORAGETYPE.VIDEOTYPE))
    if(items) items.push(video)
    else items = [video]
    localStorage.setItem(STORAGETYPE.VIDEOTYPE, JSON.stringify(items))
  }
  checkBtnClick(value){
    const menus = qsAll(".btn.mx-1")
    const target = [...menus].indexOf(value[1])
    let items = JSON.parse(localStorage.getItem(STORAGETYPE.VIDEOTYPE))

      items.forEach(el => {
        if(el.videoTitle === value[0].dataset.videoTitle){
          if(target===0){
            if(el.watched!==false) el.watched = false
            localStorage.setItem(STORAGETYPE.VIDEOTYPE, JSON.stringify(items))
            toWatchView.render()
          } else if(target===1){
            if(el.watched===false) el.watched = ""
            localStorage.setItem(STORAGETYPE.VIDEOTYPE, JSON.stringify(items))
            watchedView.render()
          }
        }
      })
  }
  render(){
    let items = JSON.parse(localStorage.getItem(STORAGETYPE.SEARCHTYPE))
    items && this.modalLatestKeywordList.show(items)
  }
}

