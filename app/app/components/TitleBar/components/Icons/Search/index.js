/* Node */
import TwotoneSearch from 'react-md-icon/dist/TwotoneSearch';
import { css } from 'aphrodite';
import React from 'react';

/* Relative */
import styles from '../styles';

const SearchIcon = ({ handleClick }) => (
    <div className={css(styles.icon, styles.search)} onClick={handleClick} title="Search">
        <TwotoneSearch />
    </div>
);

export default SearchIcon;
