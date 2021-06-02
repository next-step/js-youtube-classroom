import {
  getNotFoundTemplate,
  getSkeletonTemplate,
  getYoutubeItemsTemplate,
  getChipTemplate,
  getNoResultTemplate,
} from './htmlTemplate';

const $chips = document.querySelector('.chips');
const $snackBar = document.getElementById('snackBar');
let renderedSkeletons = [];

export const renderYoutubeItems = (item, youtubeState) => {
  const { node, youtubeItemType, isSaved } = youtubeState;
  const $article = document.createElement('article');

  $article.classList.add('clip');
  $article.innerHTML = getYoutubeItemsTemplate(item, isSaved, youtubeItemType);
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

export const renderChips = chips => {
  if (!chips) return;

  $chips.innerHTML = getChipTemplate(chips);
};

export const renderNoResult = node => {
  node.innerHTML = getNoResultTemplate();
};

export const renderSnackBar = message => {
  $snackBar.innerText = message;
  $snackBar.classList.toggle('show');
  setTimeout(() => {
    $snackBar.classList.toggle('show');
  }, 3000);
};
