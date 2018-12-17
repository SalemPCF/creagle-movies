import React from 'react';
import { createPortal } from 'react-dom';
import uuid from 'uuid/v4';
import { css } from 'aphrodite';

import { ToastContext } from './ToastContext';
import propTypes from './Toaster.propTypes';
import styles from './Toaster.styles';

export class Toaster extends React.Component {
    static propTypes = propTypes;

    /**
     * State.
     */
    state = { toasts: {} };

    /**
     * Array of all timeouts.
     */
    timeouts = [];

    /**
     * Handles unmount.
     */
    componentWillUnmount () {
        // Clear any timeouts and remove them from the array.
        this.timeouts.filter((timeout) => {
            clearTimeout(timeout);
            return false;
        });
    }

    /**
     * Adds a toast to state.
     *
     * @param {string} id
     * @param {string} text
     */
    addToast = (id, text) => this.setState(prev => ({
        toasts: {
            ...prev.toasts,
            [id]: {
                text,
                disappearing: false,
            },
        },
    }));

    /**
     * Hides the specified toast.
     *
     * @param {string} id
     */
    hideToast = id => this.setState(prev => ({
        toasts: {
            ...prev.toasts,
            [id]: {
                ...prev.toasts[id],
                disappearing: true,
            },
        },
    }));

    /**
     * Deletes the specified toast.
     *
     * @param {string} id
     */
    deleteToast = id => this.setState(prev => ({
        toasts: Object.entries(prev.toasts)
            .filter(([key]) => key !== id)
            .reduce((obj, [key, val]) => ({
                ...obj,
                [key]: val,
            }), {}),
    }));

    /**
     * The toast function that is exposed via
     * the withToaster HOC.
     */
    toast = (text, duration = 2000) => {
        const id = uuid();

        this.addToast(id, text);

        const slideInDuration = 500;
        const fadeOutDuration = 200;

        const timeout = setTimeout(() => {
            this.hideToast(id);

            const timeout2 = setTimeout(() => {
                this.deleteToast(id);
            }, fadeOutDuration);

            this.timeouts.push(timeout2);
        }, duration - fadeOutDuration + slideInDuration);

        this.timeouts.push(timeout);
    };

    /**
     * Renders the toasts.
     */
    renderToasts = () => {
        const { toasts } = this.state;

        return (
            <div className={css(styles.toaster)}>
                {Object.entries(toasts).map(([key, { text, disappearing }]) => (
                    <div
                        className={css(styles.toast, disappearing && styles.toast_disappearing)}
                        key={key}
                    >
                        <p>{text}</p>
                    </div>
                ))}
            </div>
        );
    };

    /**
     * Renders the component.
     */
    render () {
        const { children, renderTo } = this.props;

        return (
            <ToastContext.Provider value={this.toast}>
                {children}

                {renderTo
                    ? createPortal(this.renderToasts(), renderTo)
                    : this.renderToasts()}
            </ToastContext.Provider>
        );
    }
}
