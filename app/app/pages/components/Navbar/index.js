/* Node */
import { css } from 'aphrodite';
import React from 'react';

/* Relative */
import { RandomIcon, SearchIcon } from './components/Icons';
import propTypes from './propTypes';
import styles from './styles';

const Navbar = ({ title, type }) => (
    <div className={css(styles.topNav)}>
        <h2 className={css(styles.title)}>{title}</h2>

        <div className={css(styles.right)}>
            <SearchIcon type={type} />
            <RandomIcon type={type} />
        </div>
    </div>
);

Navbar.propTypes = propTypes;

export default Navbar;
