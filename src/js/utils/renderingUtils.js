import { getChipTemplate } from 'utils/templateUtils';

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

export const renderNoResult = (node, getTemplate, text) => {
  node.innerHTML = getTemplate(text);
};

export const renderSavedYoutubeNumber = () => {
  const localSavedYoutubeIds = localStorage.getItem('savedYoutubeIds');
  const $savedVideoNumber = document.querySelector(
    '.modal .saved-video-number'
  );
  const savedYoutubeNumber = localSavedYoutubeIds
    ? JSON.parse(localSavedYoutubeIds).length
    : 0;
  $savedVideoNumber.innerHTML = `저장된 영상 갯수: ${savedYoutubeNumber}/100개`;
};

export const renderLatestSearchedYoutubeChip = () => {
  const localLatestSearchedValuesData = JSON.parse(
    localStorage.getItem('latestSearchedValues')
  );
  const values = localLatestSearchedValuesData || [];
  const $latestSearchedContainer = document.querySelector(
    '.modal .latest-search-container'
  );
  $latestSearchedContainer.innerHTML = `<span class="text-gray-700">최근 검색어: </span>${
    localLatestSearchedValuesData
      ? values.map(content => getChipTemplate(content)).join('')
      : ''
  }`;
};

export const initializeElementInner = node => {
  node.innerHTML = '';
};
