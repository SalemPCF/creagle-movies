/* Node */
import { enableLiveReload } from 'electron-compile';
import { app, BrowserWindow } from 'electron';
import fs from 'fs';

/* Relative */
import { DEBUG } from './app/config/globals';

// Let us update our content and reload it automatically
enableLiveReload();

// Global window object
let win = null;

// Create our Window
const createWindow = () => {
    // Create the browser window.
    win = new BrowserWindow({ show: false /* frame: false */ });

    // Maximize our window
    if (process.platform !== 'darwin') {
        win.maximize();
    }

    // If we're debugging, open our devtools
    if (DEBUG) {
        win.webContents.openDevTools();
    }

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
};

// Create our Directories
const createDirectories = () => {
    const tempPath = app.getPath('temp');
    const creagleTempDir = `${tempPath}\\Creagle Movies`;

    try {
        fs.lstatSync(creagleTempDir).isDirectory();
    } catch (error) {
        // If our error code is no entry, create our directory
        if (error.code === 'ENOENT') {
            fs.mkdirSync(creagleTempDir);
        }
    }

    return fs.lstatSync(creagleTempDir).isDirectory();
};

// When our app is ready, create our window.
app.on('ready', () => {
    // If we created our directories, let's create our window
    if (createDirectories()) {
        createWindow();
    } else {
        throw new Error('Failed to create Directories.');
    }
});

// When our windows have been closed, close our app.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
