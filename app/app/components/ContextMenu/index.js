/* Node */
import { Component } from 'react';

/* Relative */
import { DEBUG } from '../../../config/globals';
import RemoteContext from '../RemoteContext';

class ContextMenu extends Component {
    menu = null;

    static contextType = RemoteContext;

    state = {
        mouseX: 0,
        mouseY: 0,
    };

    buildMenu () {
        const { Menu, MenuItem, getCurrentWindow } = this.context;

        const menu = new Menu();

        menu.append(new MenuItem({
            label: 'Reload',
            click: () => {
                getCurrentWindow().reload();
            },
        }));

        menu.append(new MenuItem({
            label: 'Inspect Element',
            click: () => {
                const { mouseX, mouseY } = this.state;

                getCurrentWindow().inspectElement(mouseX, mouseY);
            },
        }));

        return menu;
    }

    showMenu = (e) => {
        const { getCurrentWindow } = this.context;

        e.preventDefault();

        this.setState({ mouseX: e.x, mouseY: e.y });

        this.menu.popup({
            window: getCurrentWindow(),
        });
    }

    componentDidMount () {
        if (DEBUG) {
            this.menu = this.buildMenu();

            window.addEventListener('contextmenu', this.showMenu);
        }
    }

    componentWillUnmount () {
        if (DEBUG) {
            window.removeEventListener('contextmenu', this.showMenu);
        }
    }

    render = () => null;
}

export default ContextMenu;
