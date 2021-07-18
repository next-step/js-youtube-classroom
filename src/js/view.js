import {mainContentTemp, modalContentTemp} from "./template.js";


const $mt2 = document.querySelector(".mt-2");
const $fetchedContainer = document.querySelector("#fetched-container");
const $storedContainer = document.querySelector("#stored-container");

export const createModalArticles = (items,storedItems) => {
    let contents = ``;
    items.forEach(item => {
        contents = contents + modalContentTemp(item, storedItems);
    })
    $fetchedContainer.innerHTML = contents;
}

export const createMainArticles = (items) => {
    if (items.length === 0) {
        $storedContainer.innerHTML = `<p> 영상이 없습니다. 😥</p>`;
    } else {
        let contents = ``;
        items.forEach(item => {
            contents = contents + mainContentTemp(item);
        })
        $storedContainer.innerHTML = contents;
    }
}

export const createNotFoundDiv = () => {
    $fetchedContainer.innerHTML = `
         <div id="video-not-found" className="stretch d-flex flex-col items-center">
             <img src="./src/images/status/not_found.png" width="100px" alt="not found">
                 <h2>검색결과가 없습니다.</h2>
                 <div>다른 검색어를 시도해 보거나 검색 필터를 삭제하세요.</div>
         </div>  
         `
}

export const createSearchKeyWordElement = (searchedKeyword) => {
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

export const changePageActive = () => {
    let $activePageContainer = document.querySelector(".activePageContainer");
    for (let i = 0; i < $activePageContainer.children.length; i++) {
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