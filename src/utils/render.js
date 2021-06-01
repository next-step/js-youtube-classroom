import {
  getNotFoundTemplate,
  getSkeletonTemplate,
  getYoutubeItemsTemplate,
} from './htmlTemplate';

let renderedSkeletons = [];

export const renderYoutubeItems = (node, item, isSaved) => {
  const $article = document.createElement('article');
  $article.classList.add('clip');
  $article.innerHTML = getYoutubeItemsTemplate(item, isSaved);
  node.appendChild($article);
};

export const renderNotFoundMessage = node => {
  node.innerHTML = getNotFoundTemplate();
};

export const renderSkeleton = (node, numOfSkeletons) => {
  Array.from({ length: numOfSkeletons }, (_, i) => i).forEach(() => {
    const $div = document.createElement('div');
    $div.classList.add('skeleton');
    $div.innerHTML = getSkeletonTemplate();
    renderedSkeletons = [...renderedSkeletons, node.appendChild($div)];
  });
};

export const hideSkeleton = node => {
  renderedSkeletons.forEach(skeleton => {
    node.removeChild(skeleton);
  });
  renderedSkeletons = [];
};

export const refreshItems = node => {
  node.innerHTML = null;
};
