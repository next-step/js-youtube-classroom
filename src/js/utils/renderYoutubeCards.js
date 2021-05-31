const renderYoutubeCards = (node, datas, getTemplate) => {
  datas.forEach(data => {
    const $youtubeCardContainer = document.createElement('article');
    $youtubeCardContainer.classList.add('clip');
    $youtubeCardContainer.innerHTML = getTemplate(data);
    node.appendChild($youtubeCardContainer);
  });
};

export default renderYoutubeCards;
