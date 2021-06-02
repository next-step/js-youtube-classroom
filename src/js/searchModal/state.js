const savedYoutubeIds = JSON.parse(localStorage.getItem('savedYoutubeIds'));
const renderedYoutubes = JSON.parse(localStorage.getItem('prevYoutubeDatas'));
const savedYoutubes = JSON.parse(localStorage.getItem('savedYoutubes'));
const savedLatestSearchedValues = JSON.parse(
  localStorage.getItem('latestSearchedValues')
);

export const state = {
  searchedValue: '',
  isSearchModalFirstPage: true,
  isLectureRoomFirstPage: true,
  renderedYoutubes: renderedYoutubes || [],
  savedLatestSearchedValues: savedLatestSearchedValues || [],
  savedYoutubeIds: savedYoutubeIds || [],
  savedYoutubes: savedYoutubes || [],
  isAfterSearching: false,
  currentLectureRoomPage: 'notWatched'
};

export const lectureRoomPageInfo = {
  notWatched: {
    name: 'notWatched',
    videos:
      (savedYoutubes && savedYoutubes.filter(({ isWatched }) => !isWatched)) ||
      [],
    noResultMessage: '저장된 영상이 없습니다😃'
  },
  watched: {
    name: 'watched',
    videos:
      (savedYoutubes && savedYoutubes.filter(({ isWatched }) => isWatched)) ||
      [],
    noResultMessage: '본 영상이 없습니다😃'
  },
  liked: {
    name: 'liked',
    videos:
      (savedYoutubes && savedYoutubes.filter(({ isLiked }) => isLiked)) || [],
    noResultMessage: '좋아요 한 영상이 없습니다😃'
  }
};
