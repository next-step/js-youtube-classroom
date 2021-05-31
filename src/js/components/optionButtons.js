const optionButtons = () => {
  const $optionButtons = document.createElement('div');

  const $checkButton = document.createElement('span');
  $checkButton.textContent = '✅';
  $checkButton.classList.add('opacity-hover');
  const $likeButton = document.createElement('span');
  $likeButton.textContent = '👍';
  $likeButton.classList.add('opacity-hover');
  const $chatButton = document.createElement('span');
  $chatButton.textContent = '💬';
  $chatButton.classList.add('opacity-hover');
  const $deleteButton = document.createElement('span');
  $deleteButton.textContent = '🗑️';
  $deleteButton.classList.add('opacity-hover');

  $optionButtons.appendChild($checkButton);
  $optionButtons.appendChild($likeButton);
  $optionButtons.appendChild($chatButton);
  $optionButtons.appendChild($deleteButton);

  return $optionButtons;
};

export default optionButtons;
