import {$} from '../utils/selector.js';
import {Header} from '../components/Header.js';
import {Articles} from '../components/Articles.js';
import router from '../router.js';

export default function Classroom($el) {

    const state = {
        routePath: router.PATH.TO_WATCH,
    };

    const setState = ({routePath}) => {
        state.routePath = routePath ?? state.routePath;
        render();
    };

    this.changeRoute = ({routePath}) => {
        setState({
            routePath,
        });
    };

    const render = () => {
        const {routePath} = state;

        $el.innerHTML = `
            <div class="d-flex justify-center mt-5 w-100">
                <div class="w-100">
                    <div data-component="header"></div>
                    <div data-component="articles"></div>
                </div>
            </div>
        `;

        new Header($('[data-component=header]'), {routePath});
        new Articles($('[data-component=articles]'), {routePath});
    };

    render();
    router.registerRootComponent(this);
}
