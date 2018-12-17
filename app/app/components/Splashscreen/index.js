/* Node */
import React from 'react';
import { css } from 'aphrodite';

import { withToaster } from '../Toaster';

/* Relative */
import defaultProps from './defaultProps';
import propTypes from './propTypes';
import styles from './styles';

class Splashscreen extends React.Component {
    static propTypes = propTypes;

    static defaultProps = defaultProps;

    // State
    // eslint-disable-next-line react/destructuring-assignment
    state = { ready: this.props.ready };

    // The timeout ID
    timeout = null;

    // Timestamp of when the component mounted.
    mountedAt = null;

    componentDidMount () {
        // Save a timestamp of when the component mounted.
        this.mountedAt = this.getTimestamp();

        const { toast } = this.props;
        toast('Splashscreen!');
    }

    componentWillUnmount () {
        // Clear the timeout if it's running
        if (this.timeout) {
            clearTimeout(this.timeout);
            this.timeout = null;
        }
    }

    componentDidUpdate (prevProps) {
        const { ready, delay } = this.props;
        const { ready: alreadyReady } = this.state;

        // If the 'ready' prop has switch from 'false' to 'true',
        // and we haven't already readied up.
        if (!prevProps.ready && ready && !alreadyReady) {
            // Get the current timestamp
            const timestamp = this.getTimestamp();

            // We want the splashcreen to show for at least the specified
            // amount of milliseconds, so we take the provided delay, and
            // subtract the amount of time it took for the component to get
            // to this point.
            const timeoutDelay = delay - (timestamp - this.mountedAt);

            // Ensure that a delay is required - if the component already
            // took longer than the delay, we don't want to wait any more.
            if (timeoutDelay <= delay) {
                // Wait for the `delay` time to have passed,
                // then ready up.
                this.timeout = setTimeout(() => {
                    this.setState({ ready: true });
                }, timeoutDelay);
            } else {
                // The component took longer than the delay to mount,
                // so ready up immediately.
                // I've had to disable the line because I assume the
                // eslint rule is bugged.
                // We are already in an if so this only happens once
                // eslint-disable-next-line react/no-did-update-set-state
                this.setState({ ready: true });
            }
        }
    }

    getTimestamp = () => +new Date();

    render () {
        const { ready } = this.state;
        const { children } = this.props;

        // If we're ready, return the children
        if (ready) {
            return children;
        }

        // Otherwise, show the splashscreen
        return (
            <div className={css(styles.splashscreen)}>
                <img src="resources/splashscreen.png" alt="Creagle" className={css(styles.logo)} />
            </div>
        );
    }
}

export default withToaster(Splashscreen);
