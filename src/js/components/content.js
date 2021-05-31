import transferCreationDate from 'js/utils/transferCreationDate';

const content = ({ title, channelTitle, channelId, publishTime }, $element) => {
  const $contentContainer = document.createElement('div');
  $contentContainer.classList.add('content-container', 'pt-2', 'px-1');

  const $title = document.createElement('h3');
  $title.innerHTML = title;

  const $container = document.createElement('div');

  const $channelLink = document.createElement('a');
  $channelLink.href = `https://www.youtube.com/channel/${channelId}`;
  $channelLink.target = '_blank';
  $channelLink.rel = 'noopener';
  $channelLink.classList.add('channel-name', 'mt-1');
  $channelLink.textContent = channelTitle;

  const $publishTimeContainer = document.createElement('div');
  $publishTimeContainer.classList.add('meta');

  const $publishTime = document.createElement('p');
  $publishTime.textContent = transferCreationDate(publishTime);

  $publishTimeContainer.appendChild($publishTime);

  $container.appendChild($channelLink);
  $container.appendChild($publishTimeContainer);
  $container.appendChild($element);

  $contentContainer.appendChild($title);
  $contentContainer.appendChild($container);

  return $contentContainer;
};

export default content;
