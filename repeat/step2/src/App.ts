import {Header, Movies, SearchModal} from "~components";
import {useState} from "~@core";
import {lectureVideoService, recentSearchesService} from "~services";
import {YoutubeClipItem} from "~@domain";

export const App = () => {

  const [visibleModal, setVisibleModal] = useState(false);
  const [recentSearches, setRecentSearches] = useState(recentSearchesService.getSearches());
  const [lectureVideos, setLectureVideos] = useState(lectureVideoService.fetchLectureVideos());

  const openModal = () => setVisibleModal(true);
  const closeModal = () => setVisibleModal(false);

  const addSearchKey = (key: string) => {
    recentSearchesService.addSearchKey(key);
    setRecentSearches(recentSearchesService.getSearches());
  }

  const addLectureVideos = (videoCip: YoutubeClipItem) => {
    lectureVideoService.addLectureVideos(videoCip);
    setLectureVideos(lectureVideoService.fetchLectureVideos());
  }

  const searchModal = SearchModal({
    visibleModal,
    closeModal,
    recentSearches,
    addSearchKey,
    lectureVideos,
    addLectureVideos,
  });
  const header = Header({ openModal });
  const movies = lectureVideos.length > 0
                  ? Movies({ videos: lectureVideos })
                  : `<div>저장된 동영상이 없습니다.</div>`;

  return `
    <div class="d-flex justify-center mt-5 w-100">
      <div class="w-100">
        ${header}
        <main class="mt-10">
          ${movies}
        </main>
      </div>
    </div>
    ${searchModal}
  `;
}
