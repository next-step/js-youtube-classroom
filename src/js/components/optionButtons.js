const optionButtons = (item, playListData, render) => {
  const $optionButtons = document.createElement('div');
  $optionButtons.classList.add('option-buttons');

  const $checkButton = document.createElement('button');
  $checkButton.textContent = '✅';
  $checkButton.classList.add('opacity-hover');

  $checkButton.addEventListener('click', () => {
    const newPlayList = playListData.list.map(listItem =>
      listItem.id.videoId === item.id.videoId ? { ...listItem, isWatch: !listItem.isWatch } : listItem
    );

    render(newPlayList);
    localStorage.setItem('playList', JSON.stringify({ list: newPlayList }));
  });

  const $likeButton = document.createElement('button');
  $likeButton.textContent = '👍';
  $likeButton.classList.add('opacity-hover');
  const $chatButton = document.createElement('button');
  $chatButton.textContent = '💬';
  $chatButton.classList.add('opacity-hover');
  const $deleteButton = document.createElement('button');
  $deleteButton.textContent = '🗑️';
  $deleteButton.classList.add('opacity-hover');

  $optionButtons.appendChild($checkButton);
  $optionButtons.appendChild($likeButton);
  $optionButtons.appendChild($chatButton);
  $optionButtons.appendChild($deleteButton);

  return $optionButtons;
};

export default optionButtons;
