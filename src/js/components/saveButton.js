import $ from 'js/dom/dom';

const saveButton = item => {
  const $saveButtonContainer = document.createElement('div');
  $saveButtonContainer.classList.add('d-flex', 'justify-end', 'saveBtnContainer');

  const $saveButton = document.createElement('button');
  $saveButton.classList.add('btn');
  $saveButton.textContent = '⬇️ 저장';

  $saveButton.addEventListener('click', () => {
    console.log(item);
    const playList = JSON.parse(localStorage.getItem('playList'))?.list ?? [];
    const newPlayList = [item, ...playList.filter((_, i) => i < 99)];
    localStorage.setItem(
      'playList',
      // TODO: filter로 지금은 가장 오래된 데이터를 지워주지만 100개가 됐을땐 setItem을 안해주며 알림을 띄워주는게 가장 자연스러울것 같음
      JSON.stringify({ list: newPlayList })
    );

    $.playListLength.textContent = newPlayList.length;
  });

  $saveButtonContainer.appendChild($saveButton);

  return $saveButtonContainer;
};

export default saveButton;
