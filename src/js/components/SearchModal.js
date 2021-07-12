/**
 * 검색 모달
 * @param $el
 * @param props
 * @param {boolean} props.isShowModal
 * @param {function} props.closeModal
 * @constructor
 */
export default function SearchModal($el, props) {

    const state = {
        isShowModal: props.isShowModal,
        latestSearchKeywords: [],
        searchKeyword: '',
    };

    const setState = ({latestSearchKeywords, searchKeyword}) => {
        state.latestSearchKeywords = latestSearchKeywords ?? state.latestSearchKeywords;
        state.searchKeyword = searchKeyword ?? state.searchKeyword;

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

    const closeModal = () => {
        props.closeModal();
    };

    const submitSearch = (searchKeyword) => {
        const latestSearchKeywords = [searchKeyword, ...state.latestSearchKeywords].slice(0, 3);
        setState({searchKeyword, latestSearchKeywords});
    };

    const render = () => {
        const {isShowModal, latestSearchKeywords, searchKeyword} = state;
        const latestSearchKeywordButtons = latestSearchKeywords.map(keyword => `<a class="chip">${keyword}</a>`)
                                                               .join('');

        $el.innerHTML = `
            <div class="modal ${isShowModal && 'open'}">
                <div class="modal-inner p-8">
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
                            저장된 영상 갯수: 50개
                        </div>
                        <section class="video-wrapper">
<!--                            <article class="clip">-->
<!--                                <div class="preview-container">-->
<!--                                    <iframe-->
<!--                                        width="100%"-->
<!--                                        height="118"-->
<!--                                        src="https://www.youtube.com/embed/Ngj3498Tm_0"-->
<!--                                        frameBorder="0"-->
<!--                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"-->
<!--                                        allowFullScreen-->
<!--                                    ></iframe>-->
<!--                                </div>-->
<!--                                <div class="content-container pt-2 px-1">-->
<!--                                    <h3>아두이노 무드등</h3>-->
<!--                                    <div>-->
<!--                                        <a-->
<!--                                            href="https://www.youtube.com/channel/UC-mOekGSesms0agFntnQang"-->
<!--                                            target="_blank"-->
<!--                                            class="channel-name mt-1"-->
<!--                                        >-->
<!--                                            메이커준-->
<!--                                        </a>-->
<!--                                        <div class="meta">-->
<!--                                            <p>2021년 3월 2일</p>-->
<!--                                        </div>-->
<!--                                        <div class="d-flex justify-end">-->
<!--                                            <button class="btn">⬇️ 저장</button>-->
<!--                                        </div>-->
<!--                                    </div>-->
<!--                                </div>-->
<!--                            </article>-->
                            
                            <article class="clip skeleton">
                                <div class="preview-container image">
                                    <div></div>
                                </div>
                                <div class="content-container pt-2">
                                    <div>
                                        <div class="meta line">
                                            <p></p>
                                        </div>
                                        <div class="d-flex justify-end line mt-3"></div>
                                    </div>
                                </div>
                            </article>
                        </section>
                    </section>
                </div>
            </div>
        `;
    };

    render();
    bindEvents();
}
