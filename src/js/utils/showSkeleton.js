import { getYoutubeCardSkeleton } from './template';

const showSkeleton = (node, number) => {
  const skeleton = Array.from({ length: number })
    .map(() => getYoutubeCardSkeleton())
    .join('');
  node.innerHTML = skeleton;
};

export default showSkeleton;
