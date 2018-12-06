/* Node */
import axios from 'axios';

/* Local */
import { SERVER, DEBUG } from '../config/globals';

/* Relative */
import { Logger } from './interceptors';

// Create API instance with our base URL
const api = axios.create({
    baseURL: SERVER,
    headers: {
        'Cache-Control': 'no-cache',
    },
});

// Add HTTP Logging if in the dev environment
if (DEBUG) {
    api.interceptors.response.use(Logger.success, Logger.error);
}

export { api };
