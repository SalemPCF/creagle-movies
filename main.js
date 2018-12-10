/* Node */
import { app, BrowserWindow } from 'electron';
import fs from 'fs-extra';

/* Relative */
import { DEBUG } from './app/config/globals';

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
        // TODO: Add graceful handling here (perms etc)
    }

    return fs.lstatSync(creagleTempDir).isDirectory();
};

// Handle loading dev tool extensions
const loadExtensions = () => {
    const exts = BrowserWindow.getDevToolsExtensions();

    if (!exts['React Developer Tools']) {
        BrowserWindow.addDevToolsExtension('./ext/react-devtools');
    }

    if (!exts['Redux DevTools']) {
        BrowserWindow.addDevToolsExtension('./ext/redux-devtools');
    }
};

// When our app is ready, create our window.
app.on('ready', () => {
    // If we created our directories, let's create our window
    if (createDirectories()) {
        createWindow();
    } else {
        throw new Error('Failed to create Directories.');
    }

    loadExtensions();
});


// When our windows have been closed, close our app.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit();

        const tempPath = app.getPath('temp');
        const creagleTempDir = `${tempPath}\\Creagle Movies`;

        try {
            const isDir = fs.lstatSync(creagleTempDir).isDirectory();

            if (isDir) {
                fs.removeSync(creagleTempDir);
            }
        } catch (error) {
            // TODO: Add graceful handling here
        }
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
