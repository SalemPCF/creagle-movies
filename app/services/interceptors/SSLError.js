import axios from 'axios';

/**
 * Handles a successful HTTP response - doesn't need to do anything
 * @param {Object} response - the response
 */
const success = response => response;

/**
 * Handles an unsuccessful HTTP response - Turns iOS SSL error into axios error
 * @param {Object} error - The error object from axios
 */
const error = async (e) => {
    // If the error is because the user has cancelled the request,
    // just continue because we handle that per request
    if (axios.isCancel(e)) return Promise.reject(e);

    const err = { ...e };

    const iosErrMessage = 'An SSL error has occurred and a secure connection to the server cannot be made.';
    // eslint-disable-next-line no-underscore-dangle
    if (!err.response && err.request._response === iosErrMessage) {
        err.response = {
            status: 403.4,
            data: 'An SSL Certification error occured!',
            headers: {},
        };
    }

    return Promise.reject(err);
};

export const SSLError = { success, error };
