import { app, remote } from 'electron';
import path from 'path';
import fs from 'fs';

class LocalDatabase {
    constructor () {
        // Generate our path
        this.path = path.join((app || remote.app).getPath('userData'), 'liked.json');

        // Setup our database
        this.database = this.parseDataFile(this.path);

        // Setup our LikedList
        this.setupLikedList();
    }

    // Get a key
    get (key) {
        return this.database[key];
    }

    // Set a key
    set (key, value) {
        this.database[key] = value;

        fs.writeFileSync(this.path, JSON.stringify(this.database));
    }

    // Clear our database
    clear () {
        this.database = {};

        fs.writeFileSync(this.path, JSON.stringify(this.database));
    }

    // Parse our file and update our database
    parseDataFile (filePath) {
        try {
            return JSON.parse(fs.readFileSync(filePath));
        } catch (e) {
            // eslint-disable-next-line no-console
            console.log(e);
        }

        return {};
    }

    setupLikedList = () => {
        const likedList = this.get('liked');

        if (!(likedList instanceof Object)) {
            console.log('called');
            this.set('liked', {});
        }
    }
}

export default LocalDatabase;
