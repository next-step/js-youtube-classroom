// 관리해야 할 상태
/*
  저장된 영상 리스트 (최대 100개) - 리로딩시에는 localstorage에서 lazy loading으로 상태와 동기화시켜줄것임
  검색 로딩중임을 알 수 있는 상태
  검색결과 리스트 (비었을때를 보고 결과 없음 이미지를 보여줄 수도 있음) - 모달에 다시 접근했을때 보여줘야함
  최근 검색 키워드 - localstorage와 동기화
  모달이 열리고 닫힘
*/

interface Video {
  src: string;
  title: string;
  channelName: string;
  channelUrl: string;
  registeDate: string;
}

export interface GlobalState {
  isSearchLoading: boolean;
  error: Error;
  searchList: Video[];
  recentSearchList: [string?, string?, string?];
  saveVideoList: Video[];
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
  (state: GlobalState, action: Action): GlobalState;
}
