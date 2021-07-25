import axios from "axios";
import dotenv from 'dotenv'
import * as url from "url";
dotenv.config()
const apiKey = process.env.YOUTUBE_DATA_API_KEY

const $searchButton = document.querySelector("#search-button");
const $modalClose = document.querySelector(".modal-close");
const $modal = document.querySelector(".modal");
const $startSearchButton = document.querySelector("#start-search-button");

const onModalShow = () => {
  $modal.classList.add("open");
};

const onModalClose = () => {
  $modal.classList.remove("open");
};

const startSearch = async () => {
  // const url = `https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=${apiKey}&part=snippet&order=viewCount&q=skateboarding+dog&type=video`
  const url = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&order=viewCount&q=skateboarding+dog&type=video`

  const response = await axios.get(url)
  console.log("response", response)  // response has came

}

$searchButton.addEventListener("click", onModalShow);
$modalClose.addEventListener("click", onModalClose);
$startSearchButton.addEventListener("click", startSearch)
