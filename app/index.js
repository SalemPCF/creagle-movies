/* Node */
import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { remote } from 'electron';

/* Relative */
import App from './app';
import store from './redux/bootstrap';

const appRoot = document.getElementById('app');
const toastRoot = document.getElementById('toasts');

render((
    <Provider store={store}>
        <App remote={remote} toastRoot={toastRoot} />
    </Provider>
), appRoot);
