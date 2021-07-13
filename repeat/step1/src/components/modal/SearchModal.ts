import {addEvent, useState} from "~@core";
import {LectureVideo, YoutubeClipItem, YoutubeSearchResult} from "~@domain";
import {SearchModalVideos} from "~components/modal/SearchModalVideos";
import {youtubeSearchService} from "~services";
import {SkeletonClip} from "~components/skeletons";

export interface SearchModalProps {
  visibleModal: boolean;
  closeModal: () => void;
  recentSearches: Set<String>;
  addSearchKey: (key: string) => void;
  lectureVideos: LectureVideo[];
}

export const SearchModal = ({
  visibleModal,
  closeModal,
  recentSearches,
  lectureVideos,
  addSearchKey,
}: SearchModalProps) => {

  const [searchKey, setSearchKey] = useState("");
  const [nextPageToken, setNextPageToken] = useState("");
  const [videos, setVideos] = useState<YoutubeClipItem[]>([]);
  const [loading, setLoading] = useState(false);

  addEvent('.modal-close', 'click', closeModal);

  addEvent('#youtube-search', 'submit', e => {
    e.preventDefault();
    const target = e.target as HTMLFormElement;
    const searchKey = target.searchKey.value;
    setLoading(true);
    youtubeSearchService
      .search(searchKey)
      .then(result => {
        setNextPageToken(result.nextPageToken!);
        setVideos(result.items)
        addSearchKey(searchKey);
        setLoading(false);
      })
  })

  const searchModalVideos = SearchModalVideos({ videos });
  const skeletonClip = loading ? SkeletonClip({ count: 8 }) : '';

  return `
    <div class="modal ${visibleModal ? 'open' : 'close'}">
      <div class="modal-inner p-8">
        <button class="modal-close">
          <svg viewbox="0 0 40 40">
            <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30" />
          </svg>
        </button>
        <header>
          <h2 class="text-center">🔎 유튜브 검색</h2>
        </header>
        <form class="d-flex" id="youtube-search">
          <input name="searchKey" type="text" class="w-100 mr-2 pl-2" placeholder="검색" value="${searchKey}" />
          <button type="submit" class="btn bg-cyan-500">검색</button>
        </form>
        <section class="mt-2">
          <span class="text-gray-700">최근 검색어: </span>
          ${[ ...recentSearches ].reverse().map(searchKey => `
            <a class="chip">${searchKey}</a>
          `).join('')}
          ${recentSearches.size === 0 ? '최근 검색 내역이 존재하지 않습니다.' : ''}
        </section>
        <section>
          <div class="d-flex justify-end text-gray-700">
            저장된 영상 갯수: ${lectureVideos.length}개
          </div>
          ${searchModalVideos}
          ${skeletonClip}
        </section>
      </div>
    </div>
  `;
}
