export type Navigations = "later" | "watched" | "search-button";

export interface AppState {
  filter: Navigations;
  videoList: string[];
}

export interface HeaderProps {
  filter: Navigations;
  onChange: (id: Navigations) => void;
}
