import {findAllBySearchKey} from '../apis/youtubeApis.js';
import {$} from '../utils/selector.js';
import {SearchModalArticles} from './SearchModalArticles.js';
import modalStore from '../store/modalStore.js';
import videoStore from '../store/videoStore.js';

/**
 * 검색 모달
 * @param $el
 * @constructor
 */

export default function SearchModal($el) {

    const state = {
        latestSearchKeywords: [],
        searchKeyword: '',
        nextPageToken: '',
        articles: null,
    };

    const setState = ({latestSearchKeywords, searchKeyword, nextPageToken, articles}) => {
        state.latestSearchKeywords = latestSearchKeywords ?? state.latestSearchKeywords;
        state.searchKeyword = searchKeyword ?? state.searchKeyword;
        state.nextPageToken = nextPageToken ?? state.nextPageToken;
        state.articles = articles ?? state.articles;

        render();
    };

    const bindEvents = () => {
        $el.addEventListener('click', ({target}) => {
            if (target.closest('[data-click=close]')) {
                closeModal();
            }
        });

        $el.addEventListener('submit', event => {
            event.preventDefault();
            if (event.target.dataset.submit === 'submitSearch') {
                submitSearch(new FormData(event.target).get('searchKeyword'));
            }
        });
    };

    const bindScrollEvent = () => {
        let pending = false;
        const scrollEl = $('[data-scroll]', $el);
        scrollEl.addEventListener('scroll', ({target: scrolledEl}) => {
            if (!pending && scrolledEl.scrollHeight - scrolledEl.offsetHeight === scrolledEl.scrollTop) {
                pending = true;
                const {articles, searchKeyword, nextPageToken: pageToken} = state;
                loadArticles({isScrollLoad: true, prevArticles: articles, searchKeyword, pageToken})
                    .then(() => pending = false);
            }
        });
    };

    const closeModal = () => {
        modalStore.closeModal();
    };

    const submitSearch = (searchKeyword) => {
        const {articles} = state;
        const latestSearchKeywords = [searchKeyword, ...state.latestSearchKeywords].slice(0, 3);

        loadArticles({isScrollLoad: false, prevArticles: articles, latestSearchKeywords, searchKeyword, pageToken: ''});
    };

    const loadArticles = async ({isScrollLoad, prevArticles, latestSearchKeywords, searchKeyword, pageToken}) => {
        if (!isScrollLoad) {
            new SearchModalArticles($('[data-component=search-modal-articles]'), {articles: null});
        }

        const {nextPageToken, items} = await findAllBySearchKey({searchKeyword, pageToken});
        const articles = prevArticles ? [...prevArticles, ...items] : items;
        setState({searchKeyword, latestSearchKeywords, nextPageToken, articles});
    };

    const render = () => {
        const isShowModal = modalStore.getIsShowModal();
        const savedVideos = videoStore.getSavedVideos();

        const {latestSearchKeywords, searchKeyword, articles} = state;
        const latestSearchKeywordButtons = latestSearchKeywords.map(keyword => `<a class="chip">${keyword}</a>`)
                                                               .join('');

        $el.innerHTML = `
            <div class="modal ${isShowModal && 'open'}">
                <div class="modal-inner p-8" data-scroll>
                    <button class="modal-close" data-click="close">
                        <svg viewBox="0 0 40 40">
                            <path class="close-x" d="M 10,10 L 30,30 M 30,10 L 10,30"/>
                        </svg>
                    </button>
                    <header>
                        <h2 class="text-center">🔎 유튜브 검색</h2>
                    </header>
                    <form class="d-flex" data-submit="submitSearch">
                        <input type="text" name="searchKeyword" class="w-100 mr-2 pl-2" placeholder="검색" value="${searchKeyword}"/>
                        <button type="submit" class="btn bg-cyan-500">검색</button>
                    </form>
                    <section class="mt-2">
                        <span class="text-gray-700">최근 검색어: </span>
                        ${latestSearchKeywordButtons}
                    </section>
                    <section>
                        <div class="d-flex justify-end text-gray-700">
                            저장된 영상 갯수: ${savedVideos.length}개
                        </div>
                        <div data-component="search-modal-articles"></div>
                    </section>
                </div>
            </div>
        `;
        searchKeyword && new SearchModalArticles($('[data-component=search-modal-articles]'), {articles});

        bindScrollEvent();
    };

    render();
    bindEvents();
    modalStore.subscribeStore(() => render());
}
