export type Navigations = Filter | "search-button";

export interface AppState {
  filter: Filter;
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
  storedDatas: Set<string>;
}

export interface SearchModalHandlers {
  onCloseModal: () => void;
  onSaveVideo: (data: Item) => void;
  onRemoveVideo: (id: string) => void;
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
  storedDatas: Set<string>;
  isLoading: boolean;
  hasMore: boolean;
}

export interface SearchResultHandlers {
  onClickButton: (id: string, type: SaveButton) => void;
}

export type SaveButton = "save" | "unsave";

export interface StoredVideoCounterProps {
  storedVideoCount: number;
}

export interface ClassRoomProps {
  filter: Filter;
  videoList: ItemDB[];
}

export interface ClassRoomHandlers {
  onToggleWatch: (id: string) => void;
  onToggleLike: (id: string) => void;
  onRemoveVideo: (id: string) => void;
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
  liked: boolean;
  watched: boolean;
}

export type Filter = "watched" | "later" | "liked";

export interface StringObject<T> {
  [key: string]: T;
}
