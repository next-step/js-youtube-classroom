export type Navigations = "later" | "watched" | "search-button";

export interface AppState {
  filter: Navigations;
  videoList: string[];
  isModalOpen: boolean;
}

export interface HeaderProps {
  filter: Navigations;
  onChange: (id: Navigations) => void;
}

export interface SearchModalProps {
  isModalOpen: boolean;
  onCloseModal: () => void;
}

export interface SearchModalState {
  searchKewyord: string;
  searchHistory: string[];
  isLoading: boolean;
  lastKey: "";
}

export interface SearchBarProps {
  onSubmitSearch: (e: Event) => void;
}

export interface SearchHistoryProps {
  histories: string[];
  onClickHistory: (value: string) => void;
}

export interface SearchResultProps {
  datas: unknown[];
  isLoading: boolean;
  storedVideoCount: number;
}

export interface Snippet {
  publishedAt: string;
  title: string;
  channelTitle: string;
  channelId: string;
}
