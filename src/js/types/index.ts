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
  recentHistory: string[];
}

export interface SearchBarProps {
  onSubmitSearch: (e: Event) => void;
}
