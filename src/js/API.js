import { myKey, myKey2 } from "./APIKey.js";

const BASE_URL = 'https://www.googleapis.com/youtube/v3/search'
const SEARCH_COUNT = 10;

export const getYoutubeResultFromAPI = async (keyword) => {
    let url = new URL(`${BASE_URL}?part=snippet&q=${keyword}&maxResults=${SEARCH_COUNT}&type=video&key=${myKey2}`)
    const data = await fetch(url)
      if (data.ok) return data.json()
      else throw new Error("Error!!")
}

export const getNextYoutubeResultFromAPI = async (keyword, nextToken = '') => {
  let url = new URL(`${BASE_URL}?part=snippet&q=${keyword}&maxResults=${SEARCH_COUNT}&type=video&key=${myKey2}&pageToken=${nextToken}`)
  const data = await fetch(url)
    if (data.ok) return data.json()
    else throw new Error("Error!!")
}
