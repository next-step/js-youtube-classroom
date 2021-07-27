const SAVED_VIDEO_STORE_KEY = 'SAVED_VIDEO_STORE_KEY';

let subscribeStoreCallbackFunctions = [];

const subscribeStore = (callbackFunction) => {
    subscribeStoreCallbackFunctions.push(callbackFunction);
};

const _notify = () => {
    subscribeStoreCallbackFunctions.forEach(fn => fn());
};

const getSavedVideos = () => {
    const savedVideos = window.localStorage.getItem(SAVED_VIDEO_STORE_KEY);
    return savedVideos ? JSON.parse(savedVideos) : [];
};

const addSavedVideo = ({videoId}) => {
    const savedVideos = window.localStorage.getItem(SAVED_VIDEO_STORE_KEY);
    const newVideo = {
        videoId,
        isWatched: false,
        isLiked: false,
    };

    if (!savedVideos) {
        window.localStorage.setItem(SAVED_VIDEO_STORE_KEY, JSON.stringify([newVideo]));
        _notify();
        return;
    }

    const parsedSavedVideos = JSON.parse(savedVideos);
    if (parsedSavedVideos.length >= 100) {
        alert('저장 가능한 최대 동영상의 갯수는 100개입니다.');
        return;
    }

    window.localStorage.setItem(SAVED_VIDEO_STORE_KEY, JSON.stringify([...parsedSavedVideos, newVideo]));
    _notify();
};

const _toggleWatchedOrLikedVideo = ({videoId, propertyName}) => {
    const savedVideos = getSavedVideos();
    const targetIndex = savedVideos.findIndex(video => video.videoId === videoId);
    const targetVideo = savedVideos[targetIndex];

    savedVideos.splice(targetIndex, 1, {
        ...targetVideo,
        [propertyName]: !targetVideo[propertyName],
    });

    window.localStorage.setItem(SAVED_VIDEO_STORE_KEY, JSON.stringify(savedVideos));
    _notify();
};

const toggleWatchedVideo = ({videoId}) => {
    _toggleWatchedOrLikedVideo({videoId, propertyName: 'isWatched'});
};

const toggleLikedVideo = ({videoId}) => {
    _toggleWatchedOrLikedVideo({videoId, propertyName: 'isLiked'});
};

const deleteSavedVideo = ({videoId}) => {
    const savedVideos = getSavedVideos();
    const targetIndex = savedVideos.findIndex(video => video.videoId === videoId);

    savedVideos.splice(targetIndex, 1);

    window.localStorage.setItem(SAVED_VIDEO_STORE_KEY, JSON.stringify(savedVideos));
    _notify();
};

export {
    subscribeStore,
    getSavedVideos,
    addSavedVideo,
    toggleWatchedVideo,
    toggleLikedVideo,
    deleteSavedVideo,
};
