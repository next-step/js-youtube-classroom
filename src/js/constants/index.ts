import { StringObject, Filter } from "@/types/index";

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
};

export const MAX_DATA_NUMBER = 10;

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

export const REMOVE_CONFIRM_MESSAGE = "정말로 삭제하시겠습니까?";
