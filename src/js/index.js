// import dotenv from 'dotenv';
// dotenv.config()
// const apiKey = process.env.YOUTUBE_DATA_API_KEY
let apiKey = ''
// TODO: dotenv 설치하기 ?


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
  // TODO:env 에서 apiKey 불러오기
  const url = `https://www.googleapis.com/youtube/v3/videos?id=7lCDEYXw3mM&key=${apiKey}`
  const response = await fetch(url)
  console.log("response", response)  // response has came

}

$searchButton.addEventListener("click", onModalShow);
$modalClose.addEventListener("click", onModalClose);
$startSearchButton.addEventListener("click", startSearch)
