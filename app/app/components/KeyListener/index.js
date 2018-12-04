import { Component } from 'react';
import RemoteContext from '../RemoteContext';

import { DEBUG } from '../../../config/globals';

class KeyListener extends Component {
    static contextType = RemoteContext;

    componentDidMount () {
        window.addEventListener('keydown', this.toggleDevTools);
    }

    componentWillUnmount () {
        window.removeEventListener('keydown', this.toggleDevTools);
    }

    toggleDevTools = (e) => {
        if (DEBUG && e.which === 123) {
            this.context.getCurrentWindow().toggleDevTools();
        }
    }

    render = () => null;
}

export default KeyListener;
