const fetchVideoId = target => {
  const $clip = target.closest('.clip');
  const $iframe = $clip.querySelector('iframe');
  const iframeUrlSplit = $iframe.getAttribute('src').split('/');
  const clickedVideoId = iframeUrlSplit[iframeUrlSplit.length - 1];

  return clickedVideoId;
};

export default fetchVideoId;
