/* Node */
import TwotoneSearch from 'react-md-icon/dist/TwotoneSearch';
import React, { Component } from 'react';
import { css } from 'aphrodite';

/* Relative */
import styles from '../styles';

class SearchIcon extends Component {
    handleClick = () => {
        console.log('clicked');
    }

    render () {
        return (
            <div className={css(styles.icon, styles.search)} onClick={this.handleClick} title="Search">
                <TwotoneSearch />
            </div>
        );
    }
}

export default SearchIcon;
