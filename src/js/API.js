import { myKey, myKey2 } from "./APIKey.js";

const baseURL = 'https://www.googleapis.com/youtube/v3/search'
const searchCnt = 10;

export const getYoutubeResult = async (keyword, nextToken = '') => {
    let url =  `${baseURL}?part=snippet&q=${keyword}&maxResults=${searchCnt}&type=video&key=${myKey2}`
    if (nextToken !== '') url += `&pageToken=${nextToken}`
    const data = await fetch(url)
      if (data.ok) return data.json()
      else throw new Error("Error!!")
}
