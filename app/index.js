/* Node */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { remote } from 'electron';

/* Relative */
// import App from './app';
import App from './app';
import store from './redux/bootstrap';

render((
    <Provider store={store}>
        <App remote={remote} />
    </Provider>
), document.getElementById('app'));
