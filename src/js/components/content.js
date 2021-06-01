import transferCreationDate from 'js/utils/transferCreationDate';

const content = (videoId, { title, channelTitle, channelId, publishTime }, $element) => {
  const $contentContainer = document.createElement('div');
  $contentContainer.classList.add('content-container', 'pt-2', 'px-1');

  const $title = document.createElement('h3');

  const $videoLink = document.createElement('a');
  $videoLink.href = `https://www.youtube.com/watch?v=${videoId}`;
  $videoLink.target = '_blank';
  $videoLink.rel = 'noopener';
  $videoLink.classList.add('video-link');
  $videoLink.innerHTML = title;

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

  $title.appendChild($videoLink);

  $contentContainer.appendChild($title);
  $contentContainer.appendChild($container);

  return $contentContainer;
};

export default content;
