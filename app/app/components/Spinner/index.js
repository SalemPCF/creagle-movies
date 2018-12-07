/* Node */
import { css } from 'aphrodite';
import React from 'react';

/* Relative */
import styles from './styles';

export const Spinner = () => (
    <div className={css(styles.spinnerContainer)}>
        <div className={css(styles.spinner, styles.spinnerEllipsis)}>
            <div />
            <div />
            <div />
            <div />
        </div>
    </div>
);
