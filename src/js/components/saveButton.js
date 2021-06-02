import $ from 'js/dom/dom';

const playList = JSON.parse(localStorage.getItem('playList'))?.list ?? [];

const saveButton = (item, playListState, render) => {
  const $saveButtonContainer = document.createElement('div');
  $saveButtonContainer.classList.add('d-flex', 'justify-end', 'saveBtnContainer');

  const $saveButton = document.createElement('button');
  $saveButton.classList.add('btn');
  $saveButton.textContent = '⬇️ 저장';

  if (playList.find(({ id: { videoId } }) => videoId === item.id.videoId)) {
    $saveButton.disabled = true;
    $saveButton.style.cursor = 'not-allowed';
    $saveButton.title = '이미 저정된 영상입니다.';
  }

  $saveButton.addEventListener('click', ({ target }) => {
    const newPlayList = [...playListState.list.filter((_, i) => i < 99), { ...item, isWatch: false }];
    localStorage.setItem(
      'playList',
      // TODO: filter로 지금은 가장 오래된 데이터를 지워주지만 100개가 됐을땐 setItem을 안해주며 알림을 띄워주는게 가장 자연스러울것 같음
      JSON.stringify({ ...playListState, list: newPlayList })
    );

    if (newPlayList.length === 1) $.emptyMessageContainer.classList.remove('empty');
    render([...playListState.list, { ...item, isWatch: false }]);
    target.disabled = true;
    target.style.cursor = 'not-allowed';
    target.title = '이미 저장된 영상입니다.';
    $.playListLength.textContent = newPlayList.length;
  });

  $saveButtonContainer.appendChild($saveButton);

  return $saveButtonContainer;
};

export default saveButton;
