import {$} from '../utils/DOM.js';
import {renderSnackbar} from '../utils/render.js';

export const onSnackbar = (message) => {
    renderSnackbar(message);
    snackbarController();
};

const snackbarController = () => {
    const $snackbar = $('#snackbar');

    $snackbar.classList.toggle('show');
    setTimeout(() => {
        $snackbar.classList.toggle('show');
    }, 3000);
};
