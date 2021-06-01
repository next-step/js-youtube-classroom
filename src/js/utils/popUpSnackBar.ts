import { $ } from "@/utils/dom";
import {
  SANCKBAR_SELECTOR,
  CLASS_NAMES,
  SNACKBAR_TIME,
} from "@/constants/index";

const $snackBar = $(SANCKBAR_SELECTOR);
let timer = null as NodeJS.Timeout | null;

const popUpSnackBar = (message: string): void => {
  timer && clearTimeout(timer);
  $snackBar.innerText = message;
  $snackBar.classList.toggle(CLASS_NAMES.SHOW);
  timer = setTimeout(() => {
    $snackBar.classList.toggle(CLASS_NAMES.SHOW);
  }, SNACKBAR_TIME);
};

export default popUpSnackBar;
