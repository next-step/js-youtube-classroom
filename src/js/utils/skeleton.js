import { getYoutubeCardSkeleton } from './template';

export const showSkeleton = (node, number) => {
  Array.from({ length: number }).forEach(() => {
    const $skeleton = document.createElement('div');
    $skeleton.classList.add('skeleton');
    $skeleton.innerHTML = getYoutubeCardSkeleton();
    node.appendChild($skeleton);
  });
};

export const hideSkeleton = node => {
  const skeletons = node.querySelectorAll('.modal .skeleton');
  skeletons.forEach(skeleton => {
    node.removeChild(skeleton);
  });
};
