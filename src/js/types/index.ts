export type Navigations = Filter | "search-button";

export interface AppState {
  filter: Navigations;
  videoList: ItemDB[];
  isModalOpen: boolean;
}

export interface HeaderProps {
  filter: Navigations;
}

export interface HeaderHanlders {
  onChange: (id: Navigations) => void;
}

export interface SearchModalProps {
  isModalOpen: boolean;
  storedDatas: string[];
}

export interface SearchModalHandlers {
  onCloseModal: () => void;
}

export interface SearchModalState {
  datas: Item[];
  searchKeyword: string;
  searchHistory: string[];
  isLoading: boolean;
  lastKey: string;
  hasMore: boolean;
}

export interface SearchBarHandlers {
  onSubmitSearch: (e: Event) => void;
}

export interface SearchHistoryProps {
  histories: string[];
}

export interface SearchHistoryHandlers {
  onClickHistory: (value: string) => void;
}

export interface SearchResultProps {
  datas: Item[];
  isLoading: boolean;
  hasMore: boolean;
}

export interface Snippet {
  publishedAt: string;
  title: string;
  channelTitle: string;
  channelId: string;
}

export interface RawItem {
  id: { videoId: string };
  snippet: Snippet;
}

export interface Item {
  id: string;
  snippet: Snippet;
}

export interface APIResult {
  datas: Item[];
  lastKey: string;
  size: number;
}

export interface ItemDB {
  data: Item;
  filter: Filter;
  liked: boolean;
}

export type Filter = "watched" | "later";
