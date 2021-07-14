import { Store } from '../types';
import createStore from './createStore';
import reducer from './reducer';

const store = createStore(reducer);

export default store;
