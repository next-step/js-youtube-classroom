const savedYoutubeIds = [];

const saveYoutubeId = targetNode => {
  if (targetNode.tagName !== 'BUTTON') return;

  const isSavedYoutubeIdsFull = savedYoutubeIds.length === 100;
  if (isSavedYoutubeIdsFull) return;

  const youtubeId = targetNode.closest('article').id;
  savedYoutubeIds.push(youtubeId);
  localStorage.setItem('savedYoutubeIds', JSON.stringify(savedYoutubeIds));
};

export default saveYoutubeId;
