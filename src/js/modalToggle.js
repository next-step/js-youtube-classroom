import $ from 'js/dom/dom';

const onModalShowHandler = () => {
  $.modal.classList.add('open');
};

const onModalCloseHandler = ({ target }) => {
  if (target.matches('.modal') || target.matches('.modal-close') || target.matches('.modal-close *')) {
    $.modal.classList.remove('open');
  }
};

$.searchModalOpenButton.addEventListener('click', onModalShowHandler);

$.modal.addEventListener('click', onModalCloseHandler);
