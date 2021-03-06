import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
// required for search/filter (only available in react-select < 2.0.0)
import 'react-select/dist/react-select.css'
import App from './components/App';
import * as serviceWorker from './serviceWorker';
import 'bootstrap/dist/css/bootstrap.css';
import { HashRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import store from './store';

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <App />
    </Router>
  </Provider>,
  document.getElementById('root')
);

serviceWorker.unregister();
