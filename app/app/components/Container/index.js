/* eslint-disable react/prefer-stateless-function */

/* Node */
import React, { Component } from 'react';
import { css } from 'aphrodite';

/* Relative */
import defaultProps from './defaultProps';
import propTypes from './propTypes';
import styles from './styles';

class Container extends Component {
    static propTypes = propTypes;

    static defaultProps = defaultProps;

    render () {
        const { children, direction } = this.props;

        return (
            <div className={css(styles.container, styles[direction])}>
                {children}
            </div>
        );
    }
}

export default Container;
