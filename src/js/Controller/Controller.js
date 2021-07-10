const tag = "[Controller]"
const COOKIETYPE = {
  LOGCOOKOIE: "searchLog",
  VIDEOCOOKIE: "videoLog"
}
export default class Controller{

  constructor({modalView, modalSearchResult, modalScrollView, modalLatestKeywordList}){
    console.log(tag, "controller")

    this.modalView = modalView
    this.modalSearchResult = modalSearchResult
    this.modalScrollView = modalScrollView
    this.modalLatestKeywordList = modalLatestKeywordList

    this.nextPageToken = ""
    this.subscribeViewEvents()
    this.render()
  }
  subscribeViewEvents(){
    this.modalView.on("@submit", event=> this.search(event.detail.value))
    this.modalView.on("@save", event=>this.saveVideo(event.detail.value))
    this.modalScrollView.on("@scroll", event => this.search(event.detail.value))
  }
  async search(value=""){
    console.log("controller search")
    const data = await this.fetchData(value)
    this.nextPageToken = data.nextPageToken
    this.modalSearchResult.show(data.items)
    this.saveLog(COOKIETYPE.LOGCOOKOIE,value)
    this.render()
  }
  fetchData(value=""){
    const str = encodeURI(value)
    return fetch(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyC-AakFMMghWMpRUdksbBKGPcnb5yCApBw&q=${str}&pageToken=${this.nextPageToken}&part=snippet&maxResults=1&order=date`)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      return myJson
    });
  }
  saveLog(logtype, keyword){ 
    const cookieValue = this.getCookie(logtype)
    if(!cookieValue){
      this.setCookie(logtype, [keyword])
    } else {
      if(!cookieValue.includes(keyword)){
        console.log(cookieValue, cookieValue.length)
        cookieValue.length>2 && cookieValue.shift()
        this.setCookie(logtype, [...cookieValue, keyword])
      }
    }
  }
  getCookie(cookieName){
    try{
      const cookieValue = document.cookie
      .replace(/ /, "")
      .split(';')
      .map(el=>el.split('='))
      .find(row=> row[0].startsWith(cookieName))[1]
      .split(',')
      
      return cookieValue
    } catch(e){
      return false
    }
  }
  setCookie(logtype, cookieNames){
    // console.log('setcookie')
    document.cookie = `${logtype}=${[...cookieNames].join(',')}; max-age=60*60`
  }
  saveVideo(videoId){
    const cookieValues = this.getCookie(COOKIETYPE.VIDEOCOOKIE)
    console.log(cookieValues)
    if(!cookieValues){
      this.setCookie(COOKIETYPE.VIDEOCOOKIE,videoId)
    } else {
      // console.log(cookieValues, "saveVideo")
      cookieValues.length<=100 && this.setCookie(COOKIETYPE.VIDEOCOOKIE, [...cookieValues, videoId])
    }
  }
  render(){
    this.getCookie(COOKIETYPE.LOGCOOKOIE) && this.modalLatestKeywordList.show(this.getCookie(COOKIETYPE.LOGCOOKOIE))
  }
}