export const iterate = (cb, array, obj) => {
  const { youtubeItemType, node } = obj;

  if (youtubeItemType === 'lecture') node.innerHTML = null;

  array.forEach(element => {
    cb(element, obj);
  });
};

export const iterateWithIsSavedState = (cb, array, obj) => {
  const localSavedItems = JSON.parse(localStorage.getItem('savedItems'));

  if (!localSavedItems) {
    iterate(cb, array, obj);
    return;
  }

  array.forEach(element => {
    const {
      id: { videoId },
    } = element;
    const isSaved = localSavedItems.find(localSavedItem => {
      const {
        id: { videoId: localVideoId },
      } = localSavedItem;

      return videoId === localVideoId;
    });

    cb(element, { ...obj, isSaved });
  });
};
