import {storedItems, searchedKeyword} from "./storage.js";

let fetchedItems;

export const resetFetchedItems = (data) => {
    fetchedItems = data;
}

export const addFetchedItems = (data) => {
    data.items.forEach(item => {
        fetchedItems.items.push(item)
    });
}

export const getFetchedItems = () => {
    return fetchedItems.items;
}

export const getNextPageToken = () => {
    return fetchedItems.nextPageToken;

}

export const remainSearchedKeyword3 = (q) => {
    searchedKeyword.push(q);
    if (searchedKeyword.length > 3) {
        searchedKeyword.shift();
    }
    localStorage.setItem("latest", JSON.stringify(searchedKeyword));
}

export const getSearchedKeyword = () => {
    return searchedKeyword;
}

export const getStoredItems = () => {
    return storedItems;
}


export const saveStoredItem = (clickedVideoId) => {
    let items = fetchedItems.items;
    let fetchedVideoId = items.map(item =>
        item.id.videoId
    )
    let index = fetchedVideoId.indexOf(clickedVideoId);

    storedItems.push({
        id: items[index].id.videoId,
        snippet: items[index].snippet,
        type: {isWatched: false, isLiked: false}
    });
    localStorage.setItem('videoInfos', JSON.stringify(storedItems));
}

export const deleteStoredItem = (clickedVideoId) => {
    let storedVideoId = storedItems.map(item =>
        item.id
    )
    let index = storedVideoId.indexOf(clickedVideoId);

    storedItems.splice(index, 1);
    localStorage.setItem('videoInfos', JSON.stringify(storedItems));
}
export const toggleWatchStoredItem = (clickedVideoId) => {
    let storedVideoId = storedItems.map(item =>
        item.id
    )
    let index = storedVideoId.indexOf(clickedVideoId); // 클릭한 store아이템을 가리킨다.

    storedItems[index].type.isWatched = !storedItems[index].type.isWatched;

    storedItems.splice(index, 1, storedItems[index]);
    localStorage.setItem('videoInfos', JSON.stringify(storedItems));
}

export const toggleLikeStoredItem = (clickedVideoId) => {
    let storedVideoId = storedItems.map(item =>
        item.id
    )
    let index = storedVideoId.indexOf(clickedVideoId); // 클릭한 store아이템을 가리킨다.

    storedItems[index].type.isLiked = !storedItems[index].type.isLiked;

    storedItems.splice(index, 1, storedItems[index]);
    localStorage.setItem('videoInfos', JSON.stringify(storedItems));
}