import {initEvent, initState} from './init.js';

export const App = () => {
    initState();
    initEvent();
};

window.onload = () => {
    App();
};
