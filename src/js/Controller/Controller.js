const tag = "[Controller]"
export default class Controller{

  constructor({modalView, modalSearchResult, modalScrollView}){
    console.log(tag, "controller")

    this.modalView = modalView
    this.modalSearchResult = modalSearchResult
    this.modalScrollView = modalScrollView

    this.nextPageToken = ""
    this.subscribeViewEvents()
  }
  subscribeViewEvents(){
    this.modalView.on("@submit", event=> this.search(event.detail.value))
    this.modalScrollView.on("@scroll", event => this.search(event.detail.value))
  }
  async search(value=""){
    const data = await this.fetchData(value)
    console.log(data,"asdfqwer")
    this.nextPageToken = data.nextPageToken
    this.modalSearchResult.show(data.items)
  }
  fetchData(value=""){
    const str = encodeURI(value)
    return fetch(`https://www.googleapis.com/youtube/v3/search?key=AIzaSyC-AakFMMghWMpRUdksbBKGPcnb5yCApBw&q=${str}&pageToken=${this.nextPageToken}&part=snippet&maxResults=10&order=date`)
    .then(function(response) {
      return response.json();
    })
    .then(function(myJson) {
      // console.log(JSON.stringify(myJson),'fetch controller');
      return myJson
    });
  }

}