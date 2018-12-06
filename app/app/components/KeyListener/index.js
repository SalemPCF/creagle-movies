/* Node */
import { Component } from 'react';

/* Relative */
import RemoteContext from '../RemoteContext';
import getListeners from './listeners';

class KeyListener extends Component {
    static contextType = RemoteContext;

    events = {};

    componentDidMount () {
        getListeners(this.registerKeyEvent);

        window.addEventListener('keydown', this.handleKeyEvent);
    }

    componentWillUnmount () {
        window.removeEventListener('keydown', this.handleKeyEvent);
    }

    handleKeyEvent = (e) => {
        const handlers = this.events[e.which];

        if (handlers && handlers.length > 0) {
            handlers.forEach(handler => handler(this.context));
        }
    }

    registerKeyEvent = (keyCode, handler) => {
        if (!this.events[keyCode]) {
            this.events[keyCode] = [];
        }

        this.events[keyCode].push(handler);
    }

    render = () => null;
}

export default KeyListener;
