import { createStore } from 'redux';
import reducer from './reducers/index';
import config from './config';

let store = null;
if (config.useReduxChromeExtension) {
  store = createStore(
    reducer,
    window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
  );
} else {
  store = createStore(reducer);
}

export default store;
