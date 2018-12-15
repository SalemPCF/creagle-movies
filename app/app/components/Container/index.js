/* eslint-disable react/prefer-stateless-function */

/* Node */
import React, { Component } from 'react';
import { css } from 'aphrodite';

/* Relative */
import propTypes from './propTypes';
import styles from './styles';

class Container extends Component {
    static propTypes = propTypes;

    render () {
        const { children } = this.props;

        return (
            <div className={css(styles.container)}>
                {children}
            </div>
        );
    }
}

export default Container;
