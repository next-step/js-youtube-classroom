const tag = "[Controller]"
export default class Controller{
  constructor({modalView, modalSearchResult}){
    console.log(tag, "controller")
    this.modalView = modalView
    this.modalSearchResult = modalSearchResult

    this.subscribeViewEvents()
  }
  subscribeViewEvents(){
    this.modalView.on("@submit", event=> this.search(event.detail.value))
  }
  async search(value=""){
    const {items: videos} = await this.fetchData(value)
    this.modalSearchResult.show(videos)
  }
  async fetchData(value=""){
    const str = encodeURI(value)
    return fetch(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyC-AakFMMghWMpRUdksbBKGPcnb5yCApBw&q=${str}&part=snippet&maxResults=1&order=date`)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      // console.log(JSON.stringify(myJson),'fetch controller');
      return myJson
    });
  }

}