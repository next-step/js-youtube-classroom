import {Header, Movies, SearchModal} from "~components";
import {useState} from "~@core";
import {lectureVideoService, recentSearchesService} from "~services";
import {YoutubeClipItem} from "~@domain";
import notFoundImage from "./assets/images/status/not_found.png";
import {router} from "~router";

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

  router.setup();

  return `
    <div class="d-flex justify-center mt-5 w-100">
      <div class="w-100">
        ${header}
        <main class="mt-10">
          ${router.route()}
        </main>
      </div>
    </div>
    ${searchModal}
  `;
}
