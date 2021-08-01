// TODO: 클래스로 만들어보기

import axios from "axios";
import dotenv from 'dotenv'
dotenv.config()
const apiKey = process.env.YOUTUBE_DATA_API_KEY

const getSearchKeyword = async () => {
  const searchKeyword = document.getElementById('search-input').value

  if (searchKeyword) {
    const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&order=viewCount&q=${searchKeyword}&type=video`
    const response = await axios.get(url)
    console.log(response)
  }
}

export { getSearchKeyword }
