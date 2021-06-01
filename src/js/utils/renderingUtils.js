import { getNoResultTemplate, getChipTemplate } from 'utils/templateUtils';

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
  const localData = localStorage.getItem('savedYoutubeIds');
  const $savedVideoNumber = document.querySelector(
    '.modal .saved-video-number'
  );
  const savedYoutubeNumber = localData ? JSON.parse(localData).length : 0;
  $savedVideoNumber.innerHTML = `저장된 영상 갯수: ${savedYoutubeNumber}개`;
};

export const renderLatestSearchedYoutubeChip = () => {
  const localData = localStorage.getItem('latestSearchedValues');
  const values = localData ? JSON.parse(localData) : [];
  const $latestSearchedContainer = document.querySelector(
    '.modal .latest-search-container'
  );
  $latestSearchedContainer.innerHTML = `<span class="text-gray-700">최근 검색어: </span>${
    localData ? values.map(content => getChipTemplate(content)).join('') : ''
  }`;
};
