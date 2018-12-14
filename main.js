/* Node */
import { app, BrowserWindow, screen } from 'electron';
import fs from 'fs-extra';

/* Relative */
import { DEBUG } from './app/config/globals';

// Global window object
let win = null;

// Create our Window
const createWindow = () => {
    // Get our screenDimensions
    const screenDimensions = screen.getPrimaryDisplay().workArea;

    // Create the browser window and prevent the user resizing the window beneath 500*500 px
    win = new BrowserWindow({
        show: false,
        minWidth: 500,
        minHeight: 500,
        // We set the window width and height to the screen size
        // because this allows us to call maximize() without a noticable flicker
        // that's caused because of the difference in default screensize to maximized
        // screen size.
        width: screenDimensions.width,
        height: screenDimensions.height,
        icon: `${app.getAppPath()}/app/resources/icons/png/1024x1024.png`,
        backgroundColor: '#303030',
    });

    // Load our index.html file into that window
    win.loadFile('app/index.html');

    // Wait for our app to be ready to show it's content
    win.once('ready-to-show', () => {
        // Maximize our window
        if (process.platform !== 'darwin') {
            win.maximize();
        }

        // If we're debugging, open our devtools
        if (DEBUG) { win.webContents.openDevTools(); }

        // Show our window
        win.show();
    });

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

    // If we're debugging, load our developer extensions
    if (DEBUG) { loadExtensions(); }
});

// When our windows have been closed, close our app.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
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

        app.quit();
    }
});

app.on('activate', () => {
    if (win === null) {
        createWindow();
    }
});
