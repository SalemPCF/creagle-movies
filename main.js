import { app, BrowserWindow } from 'electron';
import { enableLiveReload } from 'electron-compile';

// Let us update our content and reload it automatically
enableLiveReload();

// Global window object
let window = null;

function createWindow () {
    // Create the browser window.
    window = new BrowserWindow({ show: false });

    // Maximize our window
    window.maximize();

    // Show our maximized window
    window.show();

    // Load our index.html file into that window
    window.loadFile('app/index.html');

    // Open the DevTools.
    window.webContents.openDevTools();

    // Close the NavBar Menu
    window.setMenu(null);

    // Emitted when the window is closed.
    window.on('closed', () => {
        window = null;
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
