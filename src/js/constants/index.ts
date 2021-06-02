import { StringObject, Filter } from "@/types/index";

export const SANCKBAR_SELECTOR = "#snackbar";

export const APP_SELECTORS = {
  HEADER: "header",
  MODAL: ".modal",
  CLASS_ROOM: "#class-room",
};

export const MODAL_SELECTORS = {
  INNER: ".modal-inner",
  CLOSE: ".modal-close",
  OBSERVER: ".observer",
};

export const SEARCH_SELECTORS = {
  SEARCH_BAR: "#search-form",
  SEARCH_HISTORY: "#search-history",
  SEARCH_COUNTER: "#stored-counter",
  SEARCH_RESULT: "#search-result",
  SEARCH_ITEM: ".clip",
  InputEvent: "input",
};

export const CLASS_NAMES = {
  MODAL_OPEN: "open",
  HISTORY: "history",
  SHOW: "show",
};

export const FILTER_ID: StringObject<Filter> = {
  later: "later",
  watched: "watched",
  liked: "liked",
};

export const SAVE_BUTTON_ID: StringObject<string> = {
  save: "save",
  unsave: "unsave",
};

export const CLASS_ROOM_ID: StringObject<string> = {
  "watch-toggler": "watch-toggler",
  "like-toggler": "like-toggler",
  "remove-button": "remove-button",
};

export const SEARCH_BUTTON_ID = "search-button";

export const SAVE_BUTTON_CAPTION = "⬇️ 저장";
export const UNSAVE_BUTTON_CAPTION = "↪️저장취소";

export const TOAST_MESSAGES = {
  SAVE: "동영상이 저장되었습니다😍",
  REMOVE: "동영상이 삭제되었습니다😭",
  WATCHED: "시청한 동영상으로 옮겨졌습니다😎",
  LATER: "볼 영상으로 옮겨졌습니다🤩",
  LIKE: "동영상을 좋아요 하셨습니다 👍🏼",
  UNLIKE: "동영상 좋아요를 취소하셨습니다👎🏼",
};

export const REMOVE_CONFIRM_MESSAGE = "정말로 삭제하시겠습니까?👻";
export const DATA_OVERFLOW_MESSAGE = "동영상은 100개까지 저장가능해요😅";
export const SERVER_ERROR_MESSAGE =
  "동영상을 불러올 수 없습니다. 잠시만 기다려주세요😱";

export const MAX_DATA_NUMBER = 10;
export const SNACKBAR_TIME = 3000;
