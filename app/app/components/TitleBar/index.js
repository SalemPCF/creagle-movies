/* Node */
import { css } from 'aphrodite';
import React from 'react';

/* Relative */
import { RandomIcon, SearchIcon } from './components/Icons';
import propTypes from './propTypes';
import styles from './styles';

const TitleBar = ({ title, type, handleSearch }) => (
    <div className={css(styles.titleBar)}>
        <h2 className={css(styles.title)}>{title}</h2>

        <div className={css(styles.right)}>
            <SearchIcon type={type} handleClick={handleSearch} />
            <RandomIcon type={type} />
        </div>
    </div>
);

TitleBar.propTypes = propTypes;

export default TitleBar;
