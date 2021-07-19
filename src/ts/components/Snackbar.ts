import { CommonProps, Component } from '../types';
import { createNode } from '../domHelper';
import store from '../store';

interface Props extends CommonProps {}

const Snackbar: Component<Props> = () => {
  const { snackbar } = store.getState();
  const $snackbar = createNode(`<div class="snackbar">${snackbar.message}</div>`);
  if (snackbar.isShow) $snackbar.classList.add('show');

  return $snackbar;
};

export default Snackbar;
