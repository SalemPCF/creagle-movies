/* Node */
import TruncateMarkup from 'react-truncate-markup';
import { withRouter } from 'react-router-dom';
import React, { Component } from 'react';
import { css } from 'aphrodite';

/* Relative */
import Ripple from '../../../../components/Ripple';
import Poster from '../../../../components/Poster';
import { showShape } from './shape';
import styles from './styles';

class Show extends Component {
    static propTypes = showShape;

    handleRippleEnd = () => {
        const { history, show, saveScrollPosition } = this.props;

        // Save the scroll position
        saveScrollPosition();

        // Go to the next page
        history.push(`/shows/${show._id}`);
    }

    render () {
        const { show } = this.props;

        return (
            <div className={css(styles.container)}>
                <Ripple styles={styles.show} onRippleEnd={this.handleRippleEnd}>
                    <Poster
                        id={show._id}
                        image={show.images.poster}
                    />

                    <div className={css(styles.info)}>
                        <TruncateMarkup lines={1}>
                            <p className={css(styles.infoText, styles.infoText_primary)}>
                                {show.title}
                            </p>
                        </TruncateMarkup>

                        <p className={css(styles.infoText, styles.infoText_secondary)}>
                            {show.year}
                        </p>
                    </div>
                </Ripple>
            </div>
        );
    }
}

export default withRouter(Show);
