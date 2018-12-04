import { DEBUG } from '../../../config/globals';

export default (registerKeyEvent) => {
    registerKeyEvent(123, (remote) => {
        if (DEBUG) {
            remote.getCurrentWindow().toggleDevTools();
        }
    });

    // Register as many key handlers as you need.
};
