import App from './App.js';
import {$} from './utils/selector.js';
import router from './router.js';

const app = new App($('#app'));
router.registerRootComponent(app);

