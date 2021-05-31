import {
  getNotFoundTemplate,
  getSkeletonTemplate,
  getYoutubeItemsTemplate,
} from './htmlTemplate';

export const renderYoutubeItems = (node, items) => {
  node.innerHTML === getSkeletonTemplate(10)
    ? (node.innerHTML = getYoutubeItemsTemplate(items))
    : (node.innerHTML += getYoutubeItemsTemplate(items));
};

export const renderNotFoundMessage = node => {
  node.innerHTML = getNotFoundTemplate();
};

export const renderSkeleton = (node, numOfSkeletons) => {
  node.innerHTML = getSkeletonTemplate(numOfSkeletons);
};
