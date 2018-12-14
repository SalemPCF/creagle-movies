import React, { createRef } from 'react';
import { css } from 'aphrodite';

import propTypes from './propTypes';
import styles from './styles';

class Ripple extends React.Component {
    /**
     * Prop types.
     */
    static propTypes = propTypes;

    /**
     * State.
     */
    state = { ripple: null };

    /**
     * Ref to the container div.
     */
    container = createRef();

    /**
     * Any timeouts that have been started are placed in this array.
     */
    timeouts = [];

    /**
     * Handles unmounting.
     */
    componentWillUnmount () {
        this.timeouts.forEach((timeout) => {
            clearTimeout(timeout);
        });
    }

    /**
     * Gets a timestamp.
     */
    getTimestamp = () => +new Date();

    /**
     * Handles mouse down - creates the ripple.
     */
    handleMouseDown = (e) => {
        const { ripple } = this.state;
        const { clientX, clientY } = e;
        const { left, top } = this.container.current.getBoundingClientRect();

        if (e.button !== 0) return;

        const x = clientX - left;
        const y = clientY - top;

        const started = this.getTimestamp();

        if (!ripple) {
            this.setState({
                ripple: { x, y, started },
            });
        }

        // We always want to clean up the ripple, even if the mouse up event
        // wasn't triggered. We do so by waiting 1 second, then if there is
        // a ripple in state that has the same timestamp as the timestamp we
        // have already (the ripple in state is definitely the one we just
        // created), then we remove it.
        this.timeouts.push(setTimeout(() => {
            this.setState((prev) => {
                if (prev.ripple && prev.ripple.started === started) {
                    return { ripple: null };
                }

                return null;
            });
        }, 1000));
    }

    /**
     * Handles the mouse up - starts cleaning up the ripple.
     */
    handleMouseUp = () => {
        const { ripple } = this.state;

        if (ripple) {
            const finished = this.getTimestamp();

            const difference = finished - ripple.started;

            if (difference < 1000) {
                // We want to wait for the difference, so that the animation has time to complete.
                // However, waiting the entire second feels sluggish, so we start at 600ms not
                // 1000ms, just so everything feels a little more fluid.
                const timeout = setTimeout(this.afterRipple, 600 - difference);
                this.timeouts.push(timeout);
            } else {
                // The difference is greater than 1000ms, so there's no need for a timeout,
                // just clean up.
                this.afterRipple();
            }
        }
    }

    /**
     * Clears up the ripple and triggers any callbacks.
     */
    afterRipple = () => {
        const { onRippleEnd } = this.props;

        // Remove the ripple
        this.setState({ ripple: null });

        // Fire the users callback
        if (onRippleEnd) {
            onRippleEnd();
        }
    }

    /**
     * Renders the component.
     */
    render () {
        const { children, styles: customStyles } = this.props;
        const { ripple } = this.state;

        return (
            <div
                ref={this.container}
                className={css(styles.container, customStyles)}
                onMouseDown={this.handleMouseDown}
                onMouseUp={this.handleMouseUp}
            >
                {children}

                {ripple && (
                    <div className={css(styles.ripple)} style={{ left: ripple.x, top: ripple.y }}>
                        <div className={css(styles.rippleInner)} />
                    </div>
                )}
            </div>
        );
    }
}

export default Ripple;
