import key from "./key.js";
// config
const apiKey = key;
let q = "";
let requestURL = ``;

// template
const modalContentTemp = (item) => {
    let temp = `
<article className="clip">
    <iframe
                    width="100%"
                    height="118"
                    src="https://www.youtube.com/embed/${item.id.videoId || item.id.playlistId}"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    loading="lazy"
                  ></iframe>
    <div class="content-container pt-2 px-1">
                  <h3>${item.snippet.title}</h3>
                  <div>
                    <a
                      href="https://www.youtube.com/channel/${item.snippet.channelId}"
                      target="_blank"
                      class="channel-name mt-1"
                    >
                      ${item.snippet.channelTitle}
                    </a>
                    <div class="meta">
                      <p>${item.snippet.publishedAt}</p>
                    </div>
                    <div class="d-flex justify-end">
                      <button class="btn store-button">⬇️ 저장</button>
                    </div>
                  </div>
    </div>
    </article>
`
    return temp;

}
const mainContentTemp = (item) => {
    let temp = `
    <article class="clip">
                  <iframe
                    width="100%"
                    height="118"
                    src="https://www.youtube.com/embed/${item.id}"
                    frameborder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowfullscreen
                    loading="lazy"
                  ></iframe>
                </div>
                <div class="content-container pt-2 px-1">
                  <h3>${item.snippet.title}</h3>
                  <div>
                    <a
                      href="https://www.youtube.com/channel/UC-mOekGSesms0agFntnQang"
                      target="_blank"
                      class="channel-name mt-1"
                    >
                      ${item.snippet.channelTitle}
                    </a>
                    <div class="meta">
                      <p>${item.snippet.publishedAt}</p>
                    </div>
                    <div>
                      <span class="opacity-hover watch">✅</span>
                      <span class="opacity-hover like">👍</span>
                      <span class="opacity-hover delete">🗑️</span>
                    </div>
                  </div>
                </article>
    `
    return temp;
}

// model
let fetchedItems;
let searchedKeyword = JSON.parse(window.localStorage.getItem('latest')) || [];
let storedItems = JSON.parse(window.localStorage.getItem('videoInfos')) || [];

const resetItems = (data) => {
  fetchedItems = data;
}

const addItems = (data) => {
  data.items.forEach(item => { fetchedItems.items.push(item) } );
}

const getItems = () => {
  return fetchedItems.items;
}

const getNextPageToken = () => {
    return fetchedItems.nextPageToken;

}

const remainSearchedKeyword3 = (q) => {
    searchedKeyword.push(q);
    if(searchedKeyword.length > 3) {
       searchedKeyword.shift();
    }
    localStorage.setItem("latest", JSON.stringify(searchedKeyword));
}

// view
const $searchButton = document.querySelector("#search-button");
const $modalClose = document.querySelector(".modal-close");
const $modal = document.querySelector(".modal");
const $fetchButton = document.querySelector("#fetch-button");
const $fetchInput = document.querySelector("#fetch-input");
const $fetchedContainer =document.querySelector("#fetched-container");
const $modalInner = document.querySelector(".modal-inner");
const $mt2 = document.querySelector(".mt-2");
const $storedContainer = document.querySelector("#stored-container");

const $goingToWatchPage = document.querySelector('#goingToWatchPage');
const $watchedPage = document.querySelector('#watchedPage');
const $likedPage = document.querySelector('#likedPage');


const createModalArticles = (items) => {
    let contents = ``;
  items.forEach(item => {
      contents = contents + modalContentTemp(item);
  })
   $fetchedContainer.innerHTML = contents;

  const $storeButtons = document.querySelectorAll('.store-button');

  items.forEach((item,index) => {
      $storeButtons[index].addEventListener('click', () => {
          storedItems.push({id: item.id.videoId, snippet: item.snippet, type: {isWatched:false, isLiked: false}})
          localStorage.setItem("videoInfos", JSON.stringify(storedItems));
          onGoingToWatchPageShow();
      })
  })
}

const createMainArticles = (items) => {
    if(items.length === 0) {
        $storedContainer.innerHTML = `<p> 영상이 없습니다. 😥</p>`;
    } else {
        let contents = ``;
        items.forEach(item => {
            contents = contents + mainContentTemp(item);
        })
        $storedContainer.innerHTML = contents;

        const $deleteButtons = document.querySelectorAll('.delete');
        const $watchButtons = document.querySelectorAll('.watch');
        const $likeButtons = document.querySelectorAll('.like');

        items.forEach((item, index) => { //
            let itemIndex = storedItems.indexOf(item); // storedItems에서 item에 해당하는 index를 구해 정확한 index를 구한다.
            $deleteButtons[index].addEventListener('click', () => {
                storedItems.splice(itemIndex, 1);
                console.log(itemIndex);
                localStorage.setItem("videoInfos", JSON.stringify(storedItems));
                onGoingToWatchPageShow();
            });

            $watchButtons[index].addEventListener('click', () => {
                let itemIndex = storedItems.indexOf(item);
                storedItems[itemIndex].type.isWatched = true;
                storedItems.splice(itemIndex, 1, storedItems[itemIndex]);
                localStorage.setItem("videoInfos", JSON.stringify(storedItems));
                onGoingToWatchPageShow();
            })

            $likeButtons[index].addEventListener('click', () => {
                let itemIndex = storedItems.indexOf(item);
                storedItems[itemIndex].type.isLiked = true;
                storedItems.splice(itemIndex, 1, storedItems[itemIndex]);
                localStorage.setItem("videoInfos", JSON.stringify(storedItems));
                onGoingToWatchPageShow();
            })


        })
    }
}





const createNotFoundDiv = () => {
    $fetchedContainer.innerHTML = `
         <div id="video-not-found" className="stretch d-flex flex-col items-center">
             <img src="./src/images/status/not_found.png" width="100px" alt="not found">
                 <h2>검색결과가 없습니다.</h2>
                 <div>다른 검색어를 시도해 보거나 검색 필터를 삭제하세요.</div>
         </div>  
         `
}

const createSearchKeyWordElement = () => {
    let items = searchedKeyword;
    let contents = `
    <span class="text-gray-700">최근 검색어: </span>
    `
    items.forEach(item => {
      contents = contents + `
       <a class="chip">${item}</a>
       `
    })
    $mt2.innerHTML = contents;
}

// controller
const onModalShow = () => {
  $modal.classList.add("open");

  createSearchKeyWordElement();
};

const onModalClose = () => {
  $modal.classList.remove("open");
};

const onFetchItemList = (e) => {
  e.preventDefault();
  q = $fetchInput.value;
  remainSearchedKeyword3(q);
  createSearchKeyWordElement();
  requestURL = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&maxResults=10&q=${q}`; //
  $fetchInput.value="";

  fetch(requestURL).then(res => res.json()).then(data => {
     resetItems(data);
     if(fetchedItems.items.length === 0) {
         createNotFoundDiv();
     }
     createModalArticles(getItems());
  });
}

const onFetchItemListWithEnter = (e) => {
  if(e.keyCode == 13) {
    e.preventDefault();
    $fetchButton.click();
  }
}

const onFetchNextPageItemList = (e) => {
    if (parseInt($modalInner.scrollTop + $modalInner.clientHeight) == parseInt($modalInner.scrollHeight)) {
      requestURL = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&maxResults=10&q=${q}&pageToken=${getNextPageToken()}`;
      fetch(requestURL).then(res => res.json()).then(data => {
          addItems(data);
          createModalArticles(getItems());
        fetchedItems.nextPageToken = data.nextPageToken;
        })
      }
    };

const onGoingToWatchPageShow = () => {
    window.history.pushState({ data: 'some data' },'Some history entry title', '/main')
    let items = storedItems.filter(item => item.type.isWatched == false); // 필터링을 하면서 문제가 생긴다.
    createMainArticles(items);
}

const onWatchedPageShow = () => {
    window.history.pushState({ data: 'some data' },'Some history entry title', '/watched');
    let items = storedItems.filter(item => item.type.isWatched == true);
    createMainArticles(items);
}

const onLikedPageShow = () => {
    window.history.pushState({ data: 'some data' },'Some history entry title', '/liked')
    let items = storedItems.filter(item => item.type.isLiked == true);
    createMainArticles(items);
}

$searchButton.addEventListener("click", onModalShow);
$modalClose.addEventListener("click", onModalClose);
$fetchButton.addEventListener("click", onFetchItemList);
$fetchInput.addEventListener("keydown", onFetchItemListWithEnter);
$modalInner.addEventListener("scroll", onFetchNextPageItemList);
//$watchedPage.addEventListener("click", );
window.addEventListener("load", onGoingToWatchPageShow);
$goingToWatchPage.addEventListener("click", onGoingToWatchPageShow);
$watchedPage.addEventListener("click", onWatchedPageShow);
$likedPage.addEventListener("click", onLikedPageShow);









