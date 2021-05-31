import { StringObject, Filter } from "@/types/index";

export const APP_SELECTORS = {
  HEADER: "header",
  MODAL: ".modal",
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
};

export const SAVE_BUTTON_ID: StringObject<string> = {
  save: "save",
  unsave: "unsave",
};

export const SEARCH_BUTTON_ID = "search-button";

export const SAVE_BUTTON_CAPTION = "⬇️ 저장";
export const UNSAVE_BUTTON_CAPTION = "↪️저장취소";
