import {Header, Movies, SearchModal} from "~components";
import {useState} from "~@core";
import {lectureVideoService, recentSearchesService} from "~services";

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

  const searchModal = SearchModal({
    visibleModal,
    closeModal,
    recentSearches,
    addSearchKey,
    lectureVideos,
  });
  const header = Header({ openModal });
  const movies = Movies();

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
