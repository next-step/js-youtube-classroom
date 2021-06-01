import { getNoResultTemplate } from 'utils/templateUtils';

export const renderMoreYoutubeCards = (
  isIntersecting,
  isFirstPage,
  searchYoutube
) => {
  if (!isIntersecting) return;
  if (!isFirstPage) searchYoutube();
};

export const renderYoutubeCards = (node, datas, getTemplate) => {
  datas.forEach(data => {
    const isSavedYoutube = JSON.parse(
      localStorage.getItem('savedYoutubeIds')
    )?.includes(data.id.videoId);

    const $youtubeCardContainer = document.createElement('article');
    $youtubeCardContainer.setAttribute('id', data.id.videoId);
    $youtubeCardContainer.classList.add('clip');
    $youtubeCardContainer.innerHTML = getTemplate(data, isSavedYoutube);
    node.appendChild($youtubeCardContainer);
  });
};

export const renderNoResult = (node, text) => {
  node.innerHTML = getNoResultTemplate(text);
};

export const renderSavedYoutubeNumber = () => {
  const $savedVideoNumber = document.querySelector('.saved-video-number');
  const savedYoutubeNumber = JSON.parse(
    localStorage.getItem('savedYoutubeIds')
  ).length;
  $savedVideoNumber.innerHTML = `저장된 영상 갯수: ${savedYoutubeNumber}개`;
};
