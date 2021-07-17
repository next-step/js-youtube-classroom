export interface YoutubeVideo {
  isWatched: boolean;
  isLike: boolean;
  kind: string;
  etag: string;
  id: {
    kind: string;
    videoId: string;
  };
  snippet: {
    publishedAt: string;
    channelId: string;
    title: string;
    description: string;
    thumbnails: {
      default: {
        url: string;
        width: number;
        height: number;
      };
      medium: {
        url: string;
        width: number;
        height: number;
      };
      high: {
        url: string;
        width: number;
        height: number;
      };
    };
    channelTitle: string;
    liveBroadcastContent: string;
    publishTime: string;
  };
}

export interface GlobalState {
  isSearchLoading: boolean;
  error: Error;
  searchList: YoutubeVideo[];
  recentSearchKeywords: string[];
  saveVideoList: YoutubeVideo[];
  currentSearchInfo: {
    nextPageToken: string;
    keyword: string;
  };
  isModalOpen: boolean;
  currentPath: string;
}

export interface Action {
  type: string;
  payload?: { [option: string]: any };
  [option: string]: any;
}

export interface Store {
  subscribe(listener: Function): Function;
  dispatch(action: Action): void;
  getState(): GlobalState;
}

export interface Reducer {
  (state?: GlobalState, action?: Action): GlobalState;
}
