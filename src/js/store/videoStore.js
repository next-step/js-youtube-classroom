const SAVED_VIDEO_STORE_KEY = 'SAVED_VIDEO_STORE_KEY';

export const getSavedVideos = () => {
    const savedVideos = window.localStorage.getItem(SAVED_VIDEO_STORE_KEY);
    return savedVideos ? JSON.parse(savedVideos) : [];
};

export const addSavedVideo = (videoId) => {
    const savedVideos = window.localStorage.getItem(SAVED_VIDEO_STORE_KEY);

    if (!savedVideos) {
        window.localStorage.setItem(SAVED_VIDEO_STORE_KEY, JSON.stringify([videoId]));
        return;
    }

    const parsedSavedVideos = JSON.parse(savedVideos);
    if (parsedSavedVideos.length >= 100) {
        alert('저장 가능한 최대 동영상의 갯수는 100개입니다.');
        return;
    }

    window.localStorage.setItem(SAVED_VIDEO_STORE_KEY, JSON.stringify([...parsedSavedVideos, videoId]));
};
