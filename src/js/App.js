import {$} from './utils/selector.js';
import Classroom from './components/Classroom.js';
import SearchModal from './components/SearchModal.js';

export default function App($el) {

    const render = () => {
        $el.innerHTML = `
            <div data-component="classroom"></div>
            <div data-component="search-modal"></div>
        `;

        new Classroom($('[data-component=classroom]'));
        new SearchModal($('[data-component=search-modal]'));
    };

    render();
}
