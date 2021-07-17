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
      let itemIndex = storedItems.map(item => item.id).indexOf(item.id.videoId);
      if(itemIndex !== -1) {
          $storeButtons[index].innerText = "↪️저장 취소";
          $storeButtons[index].addEventListener('click', function () {
              storedItems.splice(itemIndex, 1);
              localStorage.setItem("videoInfos", JSON.stringify(storedItems));
              createModalArticles(getItems());
              onPageShow();
          })
      }else {
          $storeButtons[index].innerText = "⬇️저장";
          $storeButtons[index].addEventListener('click', function () {
              storedItems.push({id: item.id.videoId, snippet: item.snippet, type: {isWatched: false, isLiked: false}})
              localStorage.setItem("videoInfos", JSON.stringify(storedItems));
              createModalArticles(getItems());
              onPageShow();
          })
      }
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

        items.forEach((item, index) => {
            let itemIndex = storedItems.indexOf(item); // storedItems에서 item에 해당하는 index를 구해 정확한 index를 구한다.

            if(storedItems[itemIndex].type.isWatched) {
                $watchButtons[index].classList.remove('opacity-hover');
            }else {
                $watchButtons[index].classList.add('opacity-hover');
            }
            if(storedItems[itemIndex].type.isLiked) {
                $likeButtons[index].classList.remove('opacity-hover');
            }else {
                $likeButtons[index].classList.add('opacity-hover');
            }

            $deleteButtons[index].addEventListener('click', () => {
                storedItems.splice(itemIndex, 1);
                localStorage.setItem("videoInfos", JSON.stringify(storedItems));
                onPageShow();
            });

            $watchButtons[index].addEventListener('click', () => {
                storedItems[itemIndex].type.isWatched = !storedItems[itemIndex].type.isWatched;
                storedItems.splice(itemIndex, 1, storedItems[itemIndex]);
                localStorage.setItem("videoInfos", JSON.stringify(storedItems));
                onPageShow();
            })

            $likeButtons[index].addEventListener('click', () => {
                storedItems[itemIndex].type.isLiked = !storedItems[itemIndex].type.isLiked;
                storedItems.splice(itemIndex, 1, storedItems[itemIndex]);
                localStorage.setItem("videoInfos", JSON.stringify(storedItems));
                onPageShow();
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

const changePageActive = () => {
    let $activePageContainer = document.querySelector(".activePageContainer");
    for(let i= 0; i< $activePageContainer.children.length; i++) {
        $activePageContainer.children[i].classList.remove('bg-cyan-100');
    }
    switch (history.state.data) {
        case 'main':
            $activePageContainer.children[0].classList.add('bg-cyan-100');
            break;
        case 'watched':
            $activePageContainer.children[1].classList.add('bg-cyan-100');
            break;
        case 'liked':
            $activePageContainer.children[2].classList.add('bg-cyan-100');
            break;
    }

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
let throttle;
const onFetchNextPageItemList = () => {
    if (parseInt($modalInner.scrollTop + $modalInner.clientHeight + 10) > parseInt($modalInner.scrollHeight)) {
        if (!throttle) {
            console.log("페칭");
            throttle = setTimeout(() => {
                throttle = null;
                requestURL = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&maxResults=10&q=${q}&pageToken=${getNextPageToken()}`;
                fetch(requestURL).then(res => res.json()).then(data => {
                    addItems(data);
                    createModalArticles(getItems());
                    fetchedItems.nextPageToken = data.nextPageToken;
                })
            }, 1000);
        }
      }
    };

const onGoingToWatchPageShow = () => {
    window.history.pushState({ data: 'main' },'Some history entry title', '/main')
    changePageActive();
    let items = storedItems.filter(item => item.type.isWatched == false); // 필터링을 하면서 문제가 생긴다.
    createMainArticles(items);
}

const onWatchedPageShow = () => {
    window.history.pushState({ data: 'watched' },'Some history entry title', '/watched');
    changePageActive();
    let items = storedItems.filter(item => item.type.isWatched == true);
    createMainArticles(items);
}

const onLikedPageShow = () => {
    window.history.pushState({ data: 'liked' },'Some history entry title', '/liked');
    changePageActive();
    let items = storedItems.filter(item => item.type.isLiked == true);
    createMainArticles(items);
}

const onPageShow = () => {
    switch (history.state.data) {
        case 'main':
            onGoingToWatchPageShow();
            break;
        case 'watched':
            onWatchedPageShow();
            break;
        case 'liked':
            onLikedPageShow();
            break;
    }
}


$searchButton.addEventListener("click", onModalShow);
$modalClose.addEventListener("click", onModalClose);
$fetchButton.addEventListener("click", onFetchItemList);
$fetchInput.addEventListener("keydown", onFetchItemListWithEnter);
$modalInner.addEventListener("scroll", onFetchNextPageItemList);
window.addEventListener("load", onGoingToWatchPageShow);
$goingToWatchPage.addEventListener("click", onGoingToWatchPageShow);
$watchedPage.addEventListener("click", onWatchedPageShow);
$likedPage.addEventListener("click", onLikedPageShow);









