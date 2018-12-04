/* Node */
import axios from 'axios';

/* Local */
import { SERVER, DEBUG } from '../config/globals';

/* Relative */
import {
    SSLError,
    Logger,
} from './interceptors';

// Create API instance with our base URL
const api = axios.create({
    baseURL: SERVER,
    headers: {
        'Cache-Control': 'no-cache',
    },
});

// Handle SSL errors
api.interceptors.response.use(SSLError.success, SSLError.error);

// Add HTTP Logging if in the dev environment
if (DEBUG) {
    api.interceptors.response.use(Logger.success, Logger.error);
}

export { api };
