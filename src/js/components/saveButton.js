import $ from 'js/dom/dom';

const saveButton = videoId => {
  const $saveButtonContainer = document.createElement('div');
  $saveButtonContainer.classList.add('d-flex', 'justify-end', 'saveBtnContainer');

  const $saveButton = document.createElement('button');
  $saveButton.classList.add('btn');
  $saveButton.textContent = '⬇️ 저장';
  $saveButton.dataset.videoId = videoId;

  $saveButton.addEventListener('click', ({ target }) => {
    const playList = JSON.parse(localStorage.getItem('playList'))?.list ?? [];
    localStorage.setItem(
      'playList',
      // TODO: filter로 지금은 가장 오래된 데이터를 지워주지만 100개가 됐을땐 setItem을 안해주며 알림을 띄워주는게 가장 자연스러울것 같음
      JSON.stringify({ list: [target.dataset.videoId, ...playList.filter((_, i) => i < 99)] })
    );

    $.playListLength.textContent = playList.length;
  });

  $saveButtonContainer.appendChild($saveButton);

  return $saveButtonContainer;
};

export default saveButton;
