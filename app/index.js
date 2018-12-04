/* Node */
import React from 'react';
import { render } from 'react-dom';
import { remote } from 'electron';

/* Relative */
import App from './app';

render(
    <App remote={remote} />,
    document.getElementById('app'),
);
