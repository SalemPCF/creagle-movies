import { app, BrowserWindow } from 'electron';
import { enableLiveReload } from 'electron-compile';

// Let us update our content and reload it automatically
enableLiveReload();

// Global window object
let win = null;

function createWindow () {
    // Create the browser window.
    win = new BrowserWindow({ show: false });

    // Maximize our window
    win.maximize();

    // Show our maximized window
    win.show();

    // Load our index.html file into that window
    win.loadFile('app/index.html');

    // Close the NavBar Menu
    win.setMenu(null);

    // Emitted when the window is closed.
    win.on('closed', () => {
        win = null;
    });
}

// When our app is ready, create our window.
app.on('ready', createWindow);

// When our windows have been closed, close our app.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});
