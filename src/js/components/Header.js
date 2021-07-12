/**
 * GNB
 * @param $el
 * @param props
 * @param {function} props.openSearchModal
 * @constructor
 */
export function Header($el, props) {

    const bindEvents = () => {
        $el.addEventListener('click', ({target}) => {
            if (target.dataset.click === 'openSearchModal') {
                openSearchModal();
            }
        });
    };

    const openSearchModal = () => {
        props.openSearchModal();
    };

    const render = () => {
        $el.innerHTML = `
            <header class="my-4">
                <h2 class="text-center font-bold">👩🏻‍💻 나만의 유튜브 강의실 👨🏻‍💻</h2>
                <nav class="d-flex justify-center">
                    <button class="btn bg-cyan-100 mx-1">👁️ 볼 영상</button>
                    <button class="btn mx-1">✅ 본 영상</button>
                    <button class="btn mx-1" data-click="openSearchModal">🔍 동영상 검색</button>
                </nav>
            </header>
        `;
    };

    render();
    bindEvents();
}
