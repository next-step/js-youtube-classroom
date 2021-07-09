const baseURL = 'https://www.googleapis.com/youtube/v3/search'
const myKey = "AIzaSyAZN_SOZwx9TByggrDt0lEelljOSbe0FNg";
const searchCnt = 10;


export const getYoutubeResult = async (keyword, nextToken = '') => {
    let url =  `${baseURL}?part=snippet&q=${keyword}&maxResults=${searchCnt}&type=video&key=${myKey}`
    if (nextToken !== '') url += `&pageToken=${nextToken}`
    console.log(url)
    const data = await fetch(url)
      if (data.ok) return data.json()
      else throw new Error("Error!!")
}
