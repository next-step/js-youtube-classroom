import $ from 'js/dom/dom';

const onModalShowHandler = () => {
  $.modal.classList.add('open');
};

const onModalCloseHandler = () => {
  $.modal.classList.remove('open');
};

$.searchModalOpenButton.addEventListener('click', onModalShowHandler);

$.modalClose.addEventListener('click', onModalCloseHandler);
