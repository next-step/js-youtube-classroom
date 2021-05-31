export type Navigations = "later" | "watched" | "search-button";

export interface AppState {
  filter: Navigations;
  videoList: string[];
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
}

export interface SearchModalHandlers {
  onCloseModal: () => void;
}

export interface SearchModalState {
  datas: Item[];
  searchKewyord: string;
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
}

export interface Snippet {
  publishedAt: string;
  title: string;
  channelTitle: string;
  channelId: string;
}

export interface Item {
  id: { videoId: string };
  snippet: Snippet;
}

export interface APIResult {
  datas: Item[];
  lastKey: string;
  size: number;
}
