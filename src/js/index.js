import { key }  from "./key.js";
import {
    createModalArticles,
    createMainArticles,
    changePageActive,
    createNotFoundDiv,
    createSearchKeyWordElement
} from "./view.js";
import {
    deleteStoredItem,
    getFetchedItems,
    toggleWatchStoredItem,
    resetFetchedItems,
    remainSearchedKeyword3,
    getNextPageToken,
    addFetchedItems,
    saveStoredItem,
    toggleLikeStoredItem,
    getSearchedKeyword,
    getStoredItems
} from "./model.js";

// config
let apiKey = key;
let q = "";
let requestURL = ``;


// view
const $searchButton = document.querySelector("#search-button");
const $modalClose = document.querySelector(".modal-close");
const $modal = document.querySelector(".modal");
const $fetchButton = document.querySelector("#fetch-button");
const $fetchInput = document.querySelector("#fetch-input");
const $modalInner = document.querySelector(".modal-inner");
const $fetchedContainer = document.querySelector("#fetched-container");
const $storedContainer = document.querySelector("#stored-container");

const $mainPage = document.querySelector('#mainPage');
const $watchedPage = document.querySelector('#watchedPage');
const $likedPage = document.querySelector('#likedPage');



// controller
const onModalShow = () => {
    $modal.classList.add("open");
    createSearchKeyWordElement(getSearchedKeyword());
};

const onModalClose = () => {
    $modal.classList.remove("open");
};

const onFetchItemList = (e) => {
    e.preventDefault();
    q = $fetchInput.value;
    remainSearchedKeyword3(q);
    createSearchKeyWordElement(getSearchedKeyword());
    requestURL = `https://www.googleapis.com/youtube/v3/search?key=${apiKey}&part=snippet&maxResults=10&q=${q}`; //
    $fetchInput.value = "";

    fetch(requestURL).then(res => res.json()).then(data => {
        resetFetchedItems(data); // model call

        if (getFetchedItems().length === 0) {
            createNotFoundDiv(); // view call
        }
        createModalArticles(getFetchedItems(), getStoredItems()); // view call
    });
}


const onFetchItemListWithEnter = (e) => {
    if (e.keyCode == 13) {
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
                    addFetchedItems(data);
                    createModalArticles(getFetchedItems(), getStoredItems());
                    getFetchedItems().nextPageToken = data.nextPageToken;
                })
            }, 1000);
        }
    }
};

const onMainPageShow = () => {
    window.history.pushState({data: 'main'}, 'Some history entry title', '/')
    changePageActive();
    let items = getStoredItems().filter(item => item.type.isWatched == false);
    createMainArticles(items);
}

const onWatchedPageShow = () => {
    window.history.pushState({data: 'watched'}, 'Some history entry title', '/watched');
    changePageActive();
    let items = getStoredItems().filter(item => item.type.isWatched == true);
    createMainArticles(items);
}

const onLikedPageShow = () => {
    window.history.pushState({data: 'liked'}, 'Some history entry title', '/liked');
    changePageActive();
    let items = getStoredItems().filter(item => item.type.isLiked == true);
    createMainArticles(items);
}

const onPageShow = () => {
    switch (history.state.data) {
        case 'main':
            onMainPageShow();
            break;
        case 'watched':
            onWatchedPageShow();
            break;
        case 'liked':
            onLikedPageShow();
            break;
    }
}


const commonLogic = (e) => {
    let itemId = e.target.parentElement.parentElement.parentElement.parentElement.children[0].getAttribute('src');
    let parsedItemId = itemId.replace('https://www.youtube.com/embed/', "")
    return parsedItemId;
}

const onSaveItem = function (e) {
    if (e.target.classList.contains('save')) {
        saveStoredItem(commonLogic(e));
        onPageShow();//view call
        createModalArticles(getFetchedItems(),getStoredItems());
    }
}

const onDeleteItem = (e) => {
    if (e.target.classList.contains('delete')) {
        deleteStoredItem(commonLogic(e));
        onPageShow();
        createModalArticles(getFetchedItems(),getStoredItems());
    }
}
const onWatchItem = (e) => {
    if (e.target.classList.contains('watch')) {
        toggleWatchStoredItem(commonLogic(e));
        onPageShow();
    }
}

const onLikeItem = (e) => {
    if (e.target.classList.contains('like')) {
        toggleLikeStoredItem(commonLogic(e));
        onPageShow();
    }
}

$searchButton.addEventListener("click", onModalShow);
$modalClose.addEventListener("click", onModalClose);
$fetchButton.addEventListener("click", onFetchItemList);
$fetchInput.addEventListener("keydown", onFetchItemListWithEnter);
$modalInner.addEventListener("scroll", onFetchNextPageItemList);

window.addEventListener("load", onMainPageShow);
$mainPage.addEventListener("click", onMainPageShow);
$watchedPage.addEventListener("click", onWatchedPageShow);
$likedPage.addEventListener("click", onLikedPageShow);

$fetchedContainer.addEventListener("click", onSaveItem);
$fetchedContainer.addEventListener("click", onDeleteItem);

$storedContainer.addEventListener("click", onDeleteItem);
$storedContainer.addEventListener("click", onLikeItem);
$storedContainer.addEventListener("click", onWatchItem);










