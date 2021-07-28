/**
 * GNB
 * @param $el
 * @param props
 * @param {string} props.routePath
 * @constructor
 */
import router from '../router.js';
import modalStore from '../store/modalStore.js';

export function Header($el, props) {

    const bindEvents = () => {
        $el.addEventListener('click', ({target: {dataset}}) => {
            if (dataset.click === 'openSearchModal') {
                openSearchModal();
            }

            if (dataset.routePath) {
                router.push({routePath: dataset.routePath});
            }
        });
    };

    const openSearchModal = () => {
        modalStore.showModal();
    };

    const menus = [
        {name: '👁️ 볼 영상', routePath: router.PATH.TO_WATCH},
        {name: '✅ 본 영상', routePath: router.PATH.WATCHED},
        {name: '👍🏻 좋아요 한 영상', routePath: router.PATH.LIKED},
    ];

    const render = () => {
        const {routePath: currentRoutePath} = props;
        const buttons = menus.map(({name, routePath}) => (`
            <button class="btn mx-1 ${routePath === currentRoutePath ? 'bg-cyan-100' : ''}" data-route-path="${routePath}">${name}</button>
        `));

        $el.innerHTML = `
            <header class="my-4">
                <h2 class="text-center font-bold">👩🏻‍💻 나만의 유튜브 강의실 👨🏻‍💻</h2>
                <nav class="d-flex justify-center">
                    ${buttons.join('')}
                    <button class="btn mx-1 rounded-full" data-click="openSearchModal">🔍</button>
                </nav>
            </header>
        `;
    };

    render();
    bindEvents();
}
