/* Node */
import { remote } from 'electron';

/**
 * @param event - The event
 * Toggles the developer tools
 **/
export const toggleDevTools = (event) => {
    // If we press the key 'f12', toggle our developer tools
    if (event.which === 123) {
        remote.getCurrentWindow().toggleDevTools();
    }
}
