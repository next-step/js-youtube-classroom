const savedYoutubeIds = JSON.parse(localStorage.getItem('savedYoutubeIds'));
const savedYoutubes = JSON.parse(localStorage.getItem('savedYoutubes'));
const renderedYoutubes = JSON.parse(localStorage.getItem('prevYoutubeDatas'));
const savedLatestSearchedValues = JSON.parse(
  localStorage.getItem('latestSearchedValues')
);

const state = {
  searchedValue: '',
  isSearchModalFirstPage: true,
  isLectureRoomFirstPage: true,
  renderedYoutubes: renderedYoutubes || [],
  savedLatestSearchedValues: savedLatestSearchedValues || [],
  savedYoutubeIds: savedYoutubeIds || [],
  savedYoutubes: savedYoutubes || [],
  isAfterSearching: false
};

export default state;
