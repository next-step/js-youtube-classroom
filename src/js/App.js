import {$} from './utils/selector.js';
import SearchModal from './components/SearchModal.js';
import {Header} from './components/Header.js';
import {Articles} from './components/Articles.js';
import router from './router.js';

export default function App($el) {

    const state = {
        isShowSearchModal: false,
        routePath: router.PATH.TO_WATCH,
    };

    const setState = ({isShowSearchModal, routePath}) => {
        state.isShowSearchModal = isShowSearchModal ?? state.isShowSearchModal;
        state.routePath = routePath ?? state.routePath;
        render();
    };

    this.changeRoute = ({routePath}) => {
        setState({
            routePath,
        });
    };

    const openSearchModal = () => {
        setState({isShowSearchModal: true});
    };

    const closeSearchModal = () => {
        setState({isShowSearchModal: false});
    };

    const render = () => {
        const {isShowSearchModal, routePath} = state;

        $el.innerHTML = `
            <div class="d-flex justify-center mt-5 w-100">
                <div class="w-100">
                    <div data-component="header"></div>
                    <div data-component="articles"></div>
                </div>
            </div>
            <div data-component="search-modal"></div>
        `;

        new Header($('[data-component=header]'), {routePath, openSearchModal});
        new Articles($('[data-component=articles]'), {routePath});
        new SearchModal($('[data-component=search-modal]'), {isShowModal: isShowSearchModal, closeModal: closeSearchModal});
    };

    render();
}
